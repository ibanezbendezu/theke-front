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
    addFolderRepresentation: (folderId: string, projectId: string, preferred?: { x: number; y: number }) => string;
    addUploadedResource: (resourceId: string, batchId: string, preferred: { x: number; y: number }, total: number) => string[];
    groupNodes: (ids: string[]) => string | null;
    ungroupNode: (groupId: string) => void;
    moveNodeToGroup: (nodeId: string, groupId?: string) => void;
    removeNodes: (ids: string[]) => void;
    focusRequest: { id: string; nonce: string } | null;
    focusNode: (id: string) => void;
    inspectorOpen: boolean;
    setInspectorOpen: (open: boolean) => void;
    openCanvasNode: (id: string) => void;
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
    inspectorOpen: true,

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
    addFolderRepresentation: (folderId, projectId, preferred) => {
        const id = crypto.randomUUID(); const viewport = get().viewport;
        const origin = preferred ?? { x: (window.innerWidth / 2 - viewport.x) / viewport.zoom, y: (window.innerHeight / 2 - viewport.y) / viewport.zoom };
        const position = placeResource(get().nodes, origin);
        set({ nodes: [...get().nodes, { id, type: 'folder', position, data: { folderId, projectId }, selected: true }] });
        return id;
    },
    addUploadedResource: (resourceId, batchId, preferred, total) => {
        void batchId; void total;
        return [get().addResourceRepresentation(resourceId, preferred)];
    },
    groupNodes: ids => {
        const current = get().nodes; const chosen = current.filter(node => ids.includes(node.id) && !node.parentId && node.type !== 'container');
        if (chosen.length < 2) return null;
        const left = Math.min(...chosen.map(node => node.position.x)) - 32; const top = Math.min(...chosen.map(node => node.position.y)) - 32;
        const right = Math.max(...chosen.map(node => node.position.x + (node.width ?? 288))) + 32;
        const bottom = Math.max(...chosen.map(node => node.position.y + (node.height ?? 112))) + 32;
        const id = crypto.randomUUID();
        const group: FlowNode = { id, type: 'container', position: { x: left, y: top }, width: Math.max(350, right - left), height: Math.max(250, bottom - top), data: { label: 'Nuevo Grupo', color: 'var(--color-surface-variant)' }, selected: true };
        const chosenIds = new Set(chosen.map(node => node.id));
        set({ nodes: [...current.filter(node => !chosenIds.has(node.id)).map(node => ({ ...node, selected: false })), group, ...chosen.map(node => ({ ...node, parentId: id, expandParent: true, position: { x: node.position.x - left, y: node.position.y - top }, selected: false }))] });
        return id;
    },
    ungroupNode: groupId => set(state => { const group = state.nodes.find(node => node.id === groupId && node.type === 'container'); if (!group) return state; return { nodes: state.nodes.filter(node => node.id !== groupId).map(node => node.parentId === groupId ? { ...node, parentId: undefined, expandParent: undefined, position: { x: node.position.x + group.position.x, y: node.position.y + group.position.y } } : node), edges: state.edges.filter(edge => edge.source !== groupId && edge.target !== groupId) }; }),
    moveNodeToGroup: (nodeId, groupId) => set(state => {
        const nodes = state.nodes; const node = nodes.find(item => item.id === nodeId); const target = groupId ? nodes.find(item => item.id === groupId && item.type === 'container') : undefined;
        if (!node || (groupId && !target) || node.id === groupId || node.type === 'container') return state;
        const priorParent = nodes.find(item => item.id === node.parentId);
        const absolute = { x: node.position.x + (priorParent?.position.x ?? 0), y: node.position.y + (priorParent?.position.y ?? 0) };
        const moved = { ...node, parentId: target?.id, expandParent: target ? true : undefined, position: { x: absolute.x - (target?.position.x ?? 0), y: absolute.y - (target?.position.y ?? 0) } };
        return { nodes: [...nodes.filter(item => item.id !== nodeId), moved] };
    }),
    removeNodes: ids => set(state => ({ nodes: state.nodes.filter(node => !ids.includes(node.id)), edges: state.edges.filter(edge => !ids.includes(edge.source) && !ids.includes(edge.target)) })),
    focusNode: id => set(state => ({ focusRequest: { id, nonce: crypto.randomUUID() }, nodes: state.nodes.map(node => ({ ...node, selected: node.id === id })) })),
    setInspectorOpen: inspectorOpen => set({ inspectorOpen }),
    openCanvasNode: id => set(state => ({ inspectorOpen: true, nodes: state.nodes.map(node => ({ ...node, selected: node.id === id })) })),
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
            const node = state.nodes.find(item => item.id === nodeId);
            if (!node || node.type === 'container' || nodeId === parentId || (parentId && !state.nodes.some(item => item.id === parentId && item.type === 'container'))) return state;
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
