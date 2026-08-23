import { useState } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { cn } from '../../../lib/utils';

// Definimos los datos del nodo
export type TextNodeData = {
    text: string;
    placeholder?: string;
};

export type TextNodeType = Node<TextNodeData, 'text'>;

export function TextNode({ data, selected }: NodeProps<TextNodeType>) {
    // Para la Fase 1, manejamos la edición de texto con estado local para mantener los 60 FPS
    // En la Fase 2, al perder el foco (onBlur), guardaríamos esto en la base de datos
    const [text, setText] = useState(data.text);

    // Calculamos las filas de la caja de texto basándonos en los saltos de línea
    const rows = text.split('\n').length;

    return (
        <div className={cn(
            "relative group min-w-[250px] p-2 rounded-lg transition-colors",
            selected ? "bg-surface-variant/50 ring-1 ring-border" : "hover:bg-surface-variant/30"
        )}>
            <textarea
                autoFocus={!data.text} // <--- ¡Esta es la magia UX! Si está vacío, enfoca.
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={data.placeholder || "Escribe algo..."}
                rows={Math.max(1, rows)}
                className="w-full bg-transparent resize-none outline-none text-on-background font-sans text-base leading-relaxed nodrag nopan overflow-hidden"
            />

            {/* Puntos de conexión (Invisibles hasta hacer hover para no ensuciar el texto) */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-outline"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-outline"
            />
        </div>
    );
}