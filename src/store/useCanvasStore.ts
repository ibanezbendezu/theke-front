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
    // Nueva función para actualizar texto y forma de la flecha en tiempo real
    updateEdgeData: (edgeId: string, newData: any) => void;
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
            type: 'editable', // <--- Asignamos nuestra flecha mutante
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
}));