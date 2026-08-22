import { create } from 'zustand';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Connection,
    type Edge,
    type EdgeChange,
    type Node,
    type NodeChange,
} from '@xyflow/react';
import { initialNodes, initialEdges } from '../mock/initialState';

    interface CanvasState {
        nodes: Node[];
        edges: Edge[];
        onNodesChange: (changes: NodeChange[]) => void;
        onEdgesChange: (changes: EdgeChange[]) => void;
        onConnect: (connection: Connection) => void;
        addNode: (node: Node) => void;
    }

    export const useCanvasStore = create<CanvasState>((set, get) => ({
        nodes: initialNodes,
        edges: initialEdges,

        // Maneja el arrastre, selección y eliminación de nodos
        onNodesChange: (changes) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },

        // Maneja los cambios en las líneas de conexión
        onEdgesChange: (changes) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },

        // Conecta dos nodos con una línea
        onConnect: (connection) => {
            set({
                edges: addEdge(connection, get().edges),
            });
        },

        // Para cuando arrastremos un nuevo archivo al lienzo
        addNode: (node) => {
            set({ nodes: [...get().nodes, node] });
        },
    }));