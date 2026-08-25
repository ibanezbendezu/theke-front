import { BaseEdge, EdgeLabelRenderer, type EdgeProps, useReactFlow } from '@xyflow/react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { GripHorizontal } from 'lucide-react';

export function EditableEdge({
                                 id, sourceX, sourceY, targetX, targetY, style, markerEnd, data, selected
                             }: EdgeProps) {
    const updateEdgeData = useCanvasStore(state => state.updateEdgeData);
    const { screenToFlowPosition } = useReactFlow();

    // 1. El Punto de Control (P1) invisible que deforma matemáticamente la curva
    const controlPoint = data?.controlPoint as { x: number, y: number } | undefined;
    const cx = controlPoint?.x ?? (sourceX + targetX) / 2;
    const cy = controlPoint?.y ?? (sourceY + targetY) / 2;

    // 2. EL ARREGLO GEOMÉTRICO:
    // Calculamos el punto EXACTO por donde pasa la línea visible (fórmula Bézier t=0.5)
    const labelX = 0.25 * sourceX + 0.5 * cx + 0.25 * targetX;
    const labelY = 0.25 * sourceY + 0.5 * cy + 0.25 * targetY;

    // 3. Ruta de dibujo SVG
    const edgePath = `M ${sourceX} ${sourceY} Q ${cx} ${cy} ${targetX} ${targetY}`;

    // 4. Lógica de arrastre
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        target.setPointerCapture(e.pointerId);

        const onPointerMove = (moveEvent: PointerEvent) => {
            const position = screenToFlowPosition({ x: moveEvent.clientX, y: moveEvent.clientY });

            // MAGIA INVERSA: Calculamos dónde debe ir el punto de control invisible
            // para que la LÍNEA VISIBLE pase exactamente por donde está el ratón del usuario.
            // Ecuación matemática: cx = 2 * mouseX - 0.5 * sourceX - 0.5 * targetX
            const newCx = 2 * position.x - 0.5 * sourceX - 0.5 * targetX;
            const newCy = 2 * position.y - 0.5 * sourceY - 0.5 * targetY;

            updateEdgeData(id, { controlPoint: { x: newCx, y: newCy } });
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            target.releasePointerCapture(upEvent.pointerId);
            target.removeEventListener('pointermove', onPointerMove);
            target.removeEventListener('pointerup', onPointerUp);
        };

        target.addEventListener('pointermove', onPointerMove);
        target.addEventListener('pointerup', onPointerUp);
    };

    return (
        <>
            {/* La línea visible */}
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={selected ? { ...style, strokeWidth: 3, stroke: 'var(--color-primary)' } : { ...style, strokeWidth: 2, stroke: 'var(--color-outline)' }} />

            {/* Hitbox para facilitar el clic en la línea */}
            <path d={edgePath} fill="none" strokeOpacity={0} strokeWidth={25} className="react-flow__edge-interaction cursor-pointer" />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        /* AHORA USAMOS labelX y labelY, anclando el elemento exactamente sobre la línea visible */
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan relative flex items-center justify-center"
                >
                    {/* Caja de Texto */}
                    <input
                        value={(data?.label as string) || ''}
                        onChange={(e) => updateEdgeData(id, { label: e.target.value })}
                        placeholder="Texto..."
                        className={`bg-background text-on-background font-medium text-xs px-2 py-1 outline-none text-center transition-all rounded-md border shadow-sm z-20
                            ${selected ? 'border-primary ring-1 ring-primary' : 'border-transparent hover:border-border'}
                        `}
                        style={{ width: Math.max(80, ((data?.label as string)?.length || 0) * 8 + 30) }}
                    />

                    {/* Tirador oculto (solo aparece al seleccionar) */}
                    <div
                        onPointerDown={handlePointerDown}
                        className={`absolute top-full mt-0.5 cursor-grab active:cursor-grabbing p-1 bg-surface border border-border rounded shadow-sm text-outline hover:text-primary transition-opacity z-10 ${selected ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
                    >
                        <GripHorizontal size={14} />
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}