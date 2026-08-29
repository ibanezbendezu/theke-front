import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { NodeResizer } from '@xyflow/react';
import { MoreHorizontal, Layers } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type GroupNodeData = {
    label?: string;
    color?: string;
};

export type GroupNodeType = Node<GroupNodeData, 'container'>;

export function GroupNode({ data, selected, width = 350, height = 250 }: NodeProps<GroupNodeType>) {
    const { label = 'Nuevo Grupo', color = 'var(--color-surface-variant)' } = data;

    return (
        // 1. El contenedor relativo recibe el width y height para que el Resizer funcione.
        <div className="relative" style={{ width, height }}>

            <NodeResizer
                color="var(--color-primary)"
                isVisible={selected}
                minWidth={250}
                minHeight={150}
            />

            {/* 2. CAJA PRINCIPAL: Le quitamos "transition-all" para eliminar el lag al redimensionar */}
            <div
                className={cn(
                    "w-full h-full flex flex-col bg-background border rounded-xl overflow-hidden shadow-sm transition-colors",
                    selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-outline/50 hover:shadow-md"
                )}
            >
                <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-background/90 backdrop-blur border border-border rounded-md text-on-surface-variant hover:text-on-background shadow-sm nodrag nopan">
                        <MoreHorizontal size={14} />
                    </button>
                </div>

                <div
                    className="flex-1 w-full h-full"
                    style={{ backgroundColor: color, opacity: 0.3 }}
                />

                <Handle type="target" position={Position.Left} className="w-3 h-3 bg-surface border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <Handle type="source" position={Position.Right} className="w-3 h-3 bg-surface border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <Handle type="target" position={Position.Top} className="w-3 h-3 bg-surface border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" id="top" />
                <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-surface border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" id="bottom" />
            </div>

            {/* 3. BARRA INFERIOR FLOTANTE: "top-full" la empuja fuera de la caja, evitando que los hijos la pisen */}
            <div className="absolute top-full left-0 w-full mt-2 px-3 py-2 flex items-center gap-2 border border-border bg-surface/90 backdrop-blur-md rounded-lg shadow-sm z-50">
                <Layers size={14} className="text-primary flex-shrink-0" />
                <input
                    defaultValue={label}
                    className="bg-transparent text-sm font-medium text-on-background outline-none truncate w-full nodrag"
                    placeholder="Nombre del contenedor..."
                />
            </div>

        </div>
    );
}