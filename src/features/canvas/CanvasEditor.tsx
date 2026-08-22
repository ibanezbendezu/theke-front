import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { useCanvasStore } from '../../store/useCanvasStore';

export function CanvasEditor() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useCanvasStore();

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView // Centra los nodos al cargar
                className="bg-background"
            >
                {/* Componentes de interfaz propios de React Flow */}
                <Background color="var(--color-border)" gap={24} size={2} />
                <Controls className="bg-surface border-border fill-on-surface-variant" />
                <MiniMap
                    nodeColor={(node) => {
                        return node.style?.backgroundColor as string || 'var(--color-surface-variant)';
                    }}
                    maskColor="var(--color-background)"
                    className="bg-surface border border-border rounded-md shadow-sm"
                />
            </ReactFlow>
        </div>
    );
}