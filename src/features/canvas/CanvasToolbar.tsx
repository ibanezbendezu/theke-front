import { useReactFlow } from '@xyflow/react';
import { ZoomIn, ZoomOut, Maximize, Plus, Group, Type, Square, Minus, Undo2, Redo2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useCanvasStore } from '../../store/useCanvasStore';

export function CanvasToolbar({ onAddResource }: { onAddResource?: () => void }) {
    // Este hook nos da acceso directo a los controles de la cámara del canvas
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    const selectedIds = useCanvasStore(state => state.nodes.filter(node => node.selected && !node.parentId && node.type !== 'container').map(node => node.id));
    const groupNodes = useCanvasStore(state => state.groupNodes);
    const addAnnotation = useCanvasStore(state => state.addAnnotation);
    const undo = useCanvasStore(state => state.undo); const redo = useCanvasStore(state => state.redo);
    const canUndo = useCanvasStore(state => state.past.length > 0); const canRedo = useCanvasStore(state => state.future.length > 0);

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 p-1.5 bg-surface-variant/80 backdrop-blur border border-border rounded-xl shadow-lg">
            {onAddResource && <><Button variant="ghost" size="sm" icon={Plus} aria-label="Añadir recurso" title="Añadir recurso (A)" onClick={onAddResource} className="w-10 h-10 p-0"/><div className="w-px h-6 bg-border mx-1"/></>}
            {selectedIds.length >= 2 && <Button variant="ghost" size="sm" icon={Group} aria-label="Crear grupo visual" title="Agrupar selección" onClick={() => groupNodes(selectedIds)} className="w-10 h-10 p-0"/>}
            {onAddResource && <><Button variant="ghost" size="sm" icon={Type} aria-label="Añadir texto visual" title="Añadir anotación de texto" onClick={() => addAnnotation('text')} className="w-10 h-10 p-0"/><Button variant="ghost" size="sm" icon={Square} aria-label="Añadir forma visual" title="Añadir forma" onClick={() => addAnnotation('shape')} className="w-10 h-10 p-0"/><Button variant="ghost" size="sm" icon={Minus} aria-label="Añadir línea visual" title="Añadir línea decorativa" onClick={() => addAnnotation('line')} className="w-10 h-10 p-0"/></>}
            <div className="w-px h-6 bg-border mx-1"/><Button variant="ghost" size="sm" icon={Undo2} aria-label="Deshacer" disabled={!canUndo} onClick={undo} className="w-10 h-10 p-0"/><Button variant="ghost" size="sm" icon={Redo2} aria-label="Rehacer" disabled={!canRedo} onClick={redo} className="w-10 h-10 p-0"/>
            <Button
                variant="ghost"
                size="sm"
                icon={ZoomOut}
                onClick={() => zoomOut({ duration: 300 })}
                className="w-10 h-10 p-0"
            />
            <Button
                variant="ghost"
                size="sm"
                icon={ZoomIn}
                onClick={() => zoomIn({ duration: 300 })}
                className="w-10 h-10 p-0"
            />
            <div className="w-px h-6 bg-border mx-1" />
            <Button
                variant="ghost"
                size="sm"
                icon={Maximize}
                onClick={() => fitView({ duration: 500, padding: 0.2 })}
                className="w-10 h-10 p-0 text-primary hover:text-primary"
            />
        </div>
    );
}
