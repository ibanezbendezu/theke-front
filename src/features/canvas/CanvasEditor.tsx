import { ReactFlow, Background, Controls, MiniMap, type NodeTypes } from '@xyflow/react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { MediaNode } from './nodes/MediaNode';

const nodeTypes: NodeTypes = {
    media: MediaNode,
};

export function CanvasEditor() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                className="bg-background"
                minZoom={0.1}
            >
                <Background color="var(--color-border)" gap={24} size={2} />
                <Controls className="bg-surface border-border fill-on-surface-variant" />
                <MiniMap
                    nodeColor={(node) => {
                        if (node.type === 'media') return 'var(--color-note-purple)';
                        return node.style?.backgroundColor as string || 'var(--color-surface-variant)';
                    }}
                    maskColor="var(--color-background)"
                    className="bg-surface border border-border rounded-md shadow-sm"
                />
            </ReactFlow>
        </div>
    );
}