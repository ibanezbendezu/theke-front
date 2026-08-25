import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Mic, Music, MoreHorizontal } from 'lucide-react';
import { cn } from '../../../lib/utils';

export type AudioNodeData = {
    title: string;
    type: 'music' | 'voice';
    url: string;
};

export type AudioNodeType = Node<AudioNodeData, 'audio'>;

export function AudioNode({ data, selected }: NodeProps<AudioNodeType>) {
    return (
        <div className={cn(
            "relative group flex flex-col gap-3 p-3 min-w-[280px] bg-background border rounded-xl shadow-sm transition-all",
            selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-outline/50 hover:shadow-md"
        )}>
            {/* Cabecera y Menú */}
            <div className="flex items-center justify-between pr-8">
                <div className="flex items-center gap-2 overflow-hidden">
                    {data.type === 'voice' ? <Mic size={16} className="text-note-red flex-shrink-0" /> : <Music size={16} className="text-primary flex-shrink-0" />}
                    <span className="text-sm font-semibold text-on-background truncate">{data.title}</span>
                </div>
            </div>

            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 bg-background/90 backdrop-blur border border-border rounded-md text-on-surface-variant hover:text-on-background shadow-sm nodrag nopan">
                    <MoreHorizontal size={14} />
                </button>
            </div>

            {/* Reproductor de Audio (nodrag nopan es vital aquí para poder usar la barra de progreso) */}
            <div className="bg-surface-variant rounded-md overflow-hidden p-1 border border-border/50">
                <audio
                    controls
                    src={data.url}
                    className="w-full h-8 outline-none nodrag nopan"
                />
            </div>

            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-surface border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-surface border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}