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
import { placeResource } from '../features/canvas/placeResource';

interface CanvasState {
    nodes: FlowNode[];
    edges: Edge[];
    viewport: { x: number; y: number; zoom: number };
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    addNode: (node: FlowNode) => void;
    addResourceRepresentation: (resourceId: string, preferred?: { x: number; y: number }) => string;
    addUploadedResource: (resourceId: string, batchId: string, preferred: { x: number; y: number }, total: number) => string[];
    removeNodes: (ids: string[]) => void;
    focusRequest: { id: string; nonce: string } | null;
    focusNode: (id: string) => void;
    updateNodeData: (nodeId: string, data: Record<string, unknown>) => void;
    loadDocument: (nodes: FlowNode[], edges: Edge[], viewport?: { x: number; y: number; zoom: number }) => void;
    setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
    updateEdgeData: (edgeId: string, newData: Record<string, unknown>) => void;
    // Función para manejar el agrupamiento
    setNodeParent: (nodeId: string, parentId: string | undefined, position: {x: number, y: number}) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    viewport: { x: 0, y: 0, zoom: 1 },
    focusRequest: null,

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
    addResourceRepresentation: (resourceId, preferred) => {
        const id = crypto.randomUUID();
        const viewport = get().viewport;
        const origin = preferred ?? { x: (window.innerWidth / 2 - viewport.x) / viewport.zoom, y: (window.innerHeight / 2 - viewport.y) / viewport.zoom };
        const position = placeResource(get().nodes, origin);
        set({ nodes: [...get().nodes, { id, type: 'resource', position, data: { resourceId }, selected: true }] });
        return id;
    },
    addUploadedResource: (resourceId, batchId, preferred, total) => {
        if (total === 1) return [get().addResourceRepresentation(resourceId, preferred)];
        const groupId = `upload-${batchId}`; const id = crypto.randomUUID(); const current = get().nodes;
        const group = current.find(node => node.id === groupId);
        const siblings = current.filter(node => node.parentId === groupId).length;
        const height = Math.max(250, 40 + total * 136);
        const groupNode: FlowNode = { id: groupId, type: 'container', position: placeResource(current, preferred, { width: 360, height }), width: 360, height, data: { label: 'Archivos cargados', color: 'var(--color-surface-variant)' } };
        const child: FlowNode = { id, type: 'resource', parentId: groupId, expandParent: true, position: { x: 32, y: 24 + siblings * 136 }, data: { resourceId }, selected: true };
        set({ nodes: group ? [...current, child] : [...current, groupNode, child] });
        return group ? [id] : [groupId, id];
    },
    removeNodes: ids => set(state => ({ nodes: state.nodes.filter(node => !ids.includes(node.id)), edges: state.edges.filter(edge => !ids.includes(edge.source) && !ids.includes(edge.target)) })),
    focusNode: id => set(state => ({ focusRequest: { id, nonce: crypto.randomUUID() }, nodes: state.nodes.map(node => ({ ...node, selected: node.id === id })) })),
    updateNodeData: (nodeId, data) => set({ nodes: get().nodes.map(node => node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node) }),

    loadDocument: (nodes, edges, viewport) => set({ nodes, edges, ...(viewport ? { viewport } : {}) }),
    setViewport: viewport => set({ viewport }),

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
