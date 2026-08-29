import { create } from 'zustand';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Connection,
    type Edge,
    type EdgeChange,
    type Node as FlowNode,
    type NodeChange,
} from '@xyflow/react';
import { initialNodes, initialEdges } from '../mock/initialState';

interface CanvasState {
    nodes: FlowNode[];
    edges: Edge[];
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    addNode: (node: FlowNode) => void;
    updateEdgeData: (edgeId: string, newData: Record<string, unknown>) => void;
    // Función para manejar el agrupamiento
    setNodeParent: (nodeId: string, parentId: string | undefined, position: {x: number, y: number}) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,

    onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
    },

    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
    },

    onConnect: (connection) => {
        const newEdge: Edge = {
            id: `e-${connection.source}-${connection.target}`,
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            type: 'editable',
            data: { label: '', controlPoint: null },
        };
        set({ edges: addEdge(newEdge, get().edges) });
    },

    addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
    },

    updateEdgeData: (edgeId, newData) => {
        set({
            edges: get().edges.map((e) =>
                e.id === edgeId ? { ...e, data: { ...e.data, ...newData } } : e
            )
        });
    },

    setNodeParent: (nodeId, parentId, position) => {
        set((state) => {
            // 1. Asignamos el padre y las coordenadas relativas
            const updatedNodes = state.nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        parentId,
                        position,
                        expandParent: parentId ? true : undefined,
                    };
                }
                return node;
            });

            // 2. REORDENAMIENTO CRÍTICO: Movemos el hijo al final del arreglo
            // Esto asegura que React Flow lo procese *después* del padre y no se rompa el drag conjunto
            const childIndex = updatedNodes.findIndex(n => n.id === nodeId);
            if (childIndex !== -1) {
                const [childNode] = updatedNodes.splice(childIndex, 1);
                updatedNodes.push(childNode);
            }

            return { nodes: updatedNodes };
        });
    },
}));