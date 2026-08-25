import { BaseEdge, EdgeLabelRenderer, type EdgeProps, useReactFlow } from '@xyflow/react';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { GripHorizontal } from 'lucide-react';

export function EditableEdge({
                                 id, sourceX, sourceY, targetX, targetY, style, markerEnd, data, selected
                             }: EdgeProps) {
    const updateEdgeData = useCanvasStore(state => state.updateEdgeData);
    const { screenToFlowPosition } = useReactFlow();

    // 1. Centro matemático exacto entre los dos nodos
    const midX = (sourceX + targetX) / 2;
    const midY = (sourceY + targetY) / 2;

    // 2. OFFSET RELATIVO (La magia que resuelve tu problema)
    // Guardamos la "distancia" desde el centro en lugar de un punto fijo.
    // Así la curva viaja solidaria con los nodos cuando los mueves.
    const offset = (data?.offset as { x: number, y: number }) || { x: 0, y: 0 };

    // 3. Posición del Punto de Control de la curva
    const cx = midX + offset.x;
    const cy = midY + offset.y;

    // 4. El punto exacto en la curva visible donde se anclará el texto
    const labelX = midX + (offset.x * 0.5);
    const labelY = midY + (offset.y * 0.5);

    // 5. Dibujo de la curva Bézier Cuadrática
    const edgePath = `M ${sourceX} ${sourceY} Q ${cx} ${cy} ${targetX} ${targetY}`;

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        target.setPointerCapture(e.pointerId);

        const onPointerMove = (moveEvent: PointerEvent) => {
            const position = screenToFlowPosition({ x: moveEvent.clientX, y: moveEvent.clientY });

            // Al arrastrar, calculamos la nueva "distancia" (offset) relativa al centro actual.
            const newOffsetX = (position.x - midX) * 2;
            const newOffsetY = (position.y - midY) * 2;

            updateEdgeData(id, { offset: { x: newOffsetX, y: newOffsetY } });
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

            {/* Hitbox para facilitar el clic/selección de la línea */}
            <path d={edgePath} fill="none" strokeOpacity={0} strokeWidth={25} className="react-flow__edge-interaction cursor-pointer" />

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        // Anclaje perfecto e inamovible usando left y top
                        left: `${labelX}px`,
                        top: `${labelY}px`,
                        transform: `translate(-50%, -50%)`,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan relative flex items-center justify-center"
                >
                    {/* Caja de Texto (El centro de este input cruzará la línea milimétricamente) */}
                    <input
                        value={(data?.label as string) || ''}
                        onChange={(e) => updateEdgeData(id, { label: e.target.value })}
                        placeholder="Añadir texto..."
                        className={`bg-background text-on-background font-medium text-xs px-2 py-1 outline-none text-center transition-all rounded-md border shadow-sm z-20
                            ${selected ? 'border-primary ring-1 ring-primary' : 'border-transparent hover:border-border'}
                        `}
                        style={{ width: Math.max(100, ((data?.label as string)?.length || 0) * 8 + 30) }}
                    />

                    {/* Tirador para deformar (Flota absolutamente por debajo del input para no afectar el centro) */}
                    <div
                        onPointerDown={handlePointerDown}
                        className={`absolute top-full mt-1 cursor-grab active:cursor-grabbing p-1 bg-surface border border-border rounded shadow-sm text-outline hover:text-primary transition-opacity z-10 ${selected ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}
                    >
                        <GripHorizontal size={14} />
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}