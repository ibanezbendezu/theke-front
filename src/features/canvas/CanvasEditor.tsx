import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ReactFlow,
    Background,
    type NodeTypes,
    ReactFlowProvider,
    useReactFlow,
    type Node as FlowNode,
    type OnConnectStart,
    type OnConnectEnd,
    type OnNodeDrag
} from '@xyflow/react';
import {
    Type,
    Image as ImageIcon,
    Square,
    Link as LinkIcon,
    FileText,
    Music,
    UploadCloud,
    Layers
} from 'lucide-react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { MediaNode } from './nodes/MediaNode';
import { TextNode } from './nodes/TextNode';
import { CanvasToolbar } from './CanvasToolbar';
import { EditableEdge } from './edges/EditableEdge';
import { ShapeNode } from './nodes/ShapeNode';
import { LinkNode } from "./nodes/LinkNode";
import { DocumentNode } from './nodes/DocumentNode';
import { AudioNode } from './nodes/AudioNode';
import { GroupNode } from './nodes/GroupNode';
import { ResourceNode } from './nodes/ResourceNode';
import { FolderNode } from './nodes/FolderNode';
import type { DiagramDocument } from '../../data/useDiagrams';

const nodeTypes: NodeTypes = {
    media: MediaNode,
    text: TextNode,
    shape: ShapeNode,
    link: LinkNode,
    container: GroupNode, // Nuestro nodo está mapeado a 'container'
    document: DocumentNode,
    audio: AudioNode,
    resource: ResourceNode,
    folder: FolderNode,
};

const edgeTypes = {
    editable: EditableEdge,
};

function CanvasCore({ viewport, onAddResource, onDropResource, onDropFiles, onPickFiles }: { viewport?: DiagramDocument['viewport']; onAddResource?: (position?: { x: number; y: number }) => void; onDropResource?: (resourceId: string, position: { x: number; y: number }) => void; onDropFiles?: (files: File[], position: { x: number; y: number }) => void; onPickFiles?: (position?: { x: number; y: number }) => void }) {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setNodeParent } = useCanvasStore();
    const { screenToFlowPosition, getIntersectingNodes, setViewport, setCenter } = useReactFlow();
    const saveViewport = useCanvasStore(state => state.setViewport);
    const focusRequest = useCanvasStore(state => state.focusRequest);
    useEffect(() => { if (viewport) void setViewport(viewport); }, [viewport, setViewport]);
    useEffect(() => { if (!focusRequest) return; const nodes = useCanvasStore.getState().nodes; const node = nodes.find(item => item.id === focusRequest.id); if (!node) return; let x = node.position.x; let y = node.position.y; let parentId = node.parentId; while (parentId) { const parent = nodes.find(item => item.id === parentId); if (!parent) break; x += parent.position.x; y += parent.position.y; parentId = parent.parentId; } void setCenter(x + (node.width ?? 288) / 2, y + (node.height ?? 112) / 2, { zoom: 1, duration: 300 }); }, [focusRequest, setCenter]);

    const connectingNodeId = useRef<string | null>(null);

    const [menu, setMenu] = useState<{ isOpen: boolean; x: number; y: number; flowPosition: { x: number; y: number } | null; }>({ isOpen: false, x: 0, y: 0, flowPosition: null });
    const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; x: number; y: number; flowPosition: { x: number; y: number }; } | null>(null);

    const onPaneClick = useCallback((event: React.MouseEvent) => {
        setMenu((m) => ({ ...m, isOpen: false }));
        setContextMenu(null);
        if (event.detail === 2) {
            addNode({ id: crypto.randomUUID(), type: 'text', position: screenToFlowPosition({ x: event.clientX, y: event.clientY }), data: { text: '' } });
        }
    }, [screenToFlowPosition, addNode]);

    const onPaneContextMenu = useCallback((event: React.MouseEvent | MouseEvent) => {
        event.preventDefault();
        const e = event as MouseEvent;
        setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY, flowPosition: screenToFlowPosition({ x: e.clientX, y: e.clientY }) });
    }, [screenToFlowPosition]);

    const onNodeDragStop: OnNodeDrag = useCallback((_, node: FlowNode) => {
        const intersections = getIntersectingNodes(node);

        // CORRECCIÓN: Buscamos contenedores de tipo 'container'
        const dropContainer = intersections.find(n => n.type === 'container');

        const getAbs = (n: FlowNode) => {
            const nx = n as FlowNode & { internals?: { positionAbsolute?: { x: number; y: number } }; positionAbsolute?: { x: number; y: number } };
            return {
                x: nx.internals?.positionAbsolute?.x ?? nx.positionAbsolute?.x ?? n.position.x,
                y: nx.internals?.positionAbsolute?.y ?? nx.positionAbsolute?.y ?? n.position.y
            };
        };

        const nodeAbs = getAbs(node);

        if (dropContainer) {
            if (node.parentId === dropContainer.id) return;
            const containerAbs = getAbs(dropContainer);

            setNodeParent(node.id, dropContainer.id, {
                x: nodeAbs.x - containerAbs.x,
                y: nodeAbs.y - containerAbs.y
            });
        } else if (node.parentId) {
            setNodeParent(node.id, undefined, nodeAbs);
        }
    }, [getIntersectingNodes, setNodeParent]);

    const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd: OnConnectEnd = useCallback((event) => {
        const target = event.target as Element;
        if (target.classList.contains('react-flow__pane') && connectingNodeId.current) {
            const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
            setMenu({ isOpen: true, x: clientX, y: clientY, flowPosition: screenToFlowPosition({ x: clientX, y: clientY }) });
        }
    }, [screenToFlowPosition]);

    const handleCreateNode = (type: string, targetPos?: {x: number, y: number}) => {
        const pos = targetPos || menu.flowPosition;
        if (!pos) return;

        const newNodeId = crypto.randomUUID();
        let newData = {};

        switch(type) {
            case 'text': newData = { text: '' }; break;
            case 'media': newData = { label: 'Nueva Imagen', type: 'image', url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600' }; break;
            case 'shape': newData = { shapeType: 'rectangle', color: 'var(--color-surface-variant)', borderRadius: 16 }; break;
            case 'document': newData = { filename: 'Documento_Nuevo', extension: 'pdf', size: '1.2 MB' }; break;
            case 'audio': newData = { title: 'Pista de Audio', type: 'music', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }; break;
            case 'link': newData = { title: 'Nuevo Bookmark', url: 'https://google.com', description: 'Visita este enlace' }; break;
            // CORRECCIÓN: Casamos la opción con 'container'
            case 'container': newData = { label: 'Nuevo Grupo', color: 'var(--color-surface-variant)' }; break;
        }

        addNode({
            id: newNodeId,
            type,
            position: pos,
            data: newData,
            // CORRECCIÓN: Ajustamos el tamaño basándonos en 'container'
            width: type === 'container' ? 350 : (type === 'shape' ? 150 : undefined),
            height: type === 'container' ? 250 : (type === 'shape' ? 150 : undefined),
        });

        if (connectingNodeId.current) {
            onConnect({ source: connectingNodeId.current, target: newNodeId, sourceHandle: null, targetHandle: null });
            connectingNodeId.current = null;
        }

        setMenu({ isOpen: false, x: 0, y: 0, flowPosition: null });
        setContextMenu(null);
    };

    return (
        <div className="w-full h-full" onDragOver={event => { if (event.dataTransfer.types.includes('application/x-theke-resource') || event.dataTransfer.types.includes('Files')) event.preventDefault(); }} onDrop={event => { const id = event.dataTransfer.getData('application/x-theke-resource'); const position = screenToFlowPosition({ x: event.clientX, y: event.clientY }); if (id && onDropResource) { event.preventDefault(); onDropResource(id, position); } else if (event.dataTransfer.files.length && onDropFiles) { event.preventDefault(); onDropFiles([...event.dataTransfer.files], position); } }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                onPaneClick={onPaneClick}
                onPaneContextMenu={onPaneContextMenu}
                onNodeDragStop={onNodeDragStop}
                onMoveEnd={(_, next) => saveViewport(next)}
                proOptions={{ hideAttribution: true }}
                fitView={!viewport}
                className="bg-background"
                minZoom={0.1}
            >
                <Background color="var(--color-border)" gap={24} size={2} />
            </ReactFlow>

            {menu.isOpen && (
                <div className="fixed z-50 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden flex flex-col p-1" style={{ top: menu.y, left: menu.x }}>
                    <span className="text-[10px] font-bold text-outline px-2 py-2 uppercase tracking-wider">Conectar a...</span>
                    <button onClick={() => handleCreateNode('text')} className="flex items-center gap-2 px-2 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><Type size={16} className="text-primary" /> Texto</button>
                    <button onClick={() => handleCreateNode('media')} className="flex items-center gap-2 px-2 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><ImageIcon size={16} className="text-note-green" /> Media</button>
                </div>
            )}

            {contextMenu && (
                <div className="fixed z-[100] w-46 bg-background border border-border rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    {onPickFiles && <button onClick={() => { onPickFiles(contextMenu.flowPosition); setContextMenu(null); }} className="flex items-center gap-3 px-3 py-2.5 text-sm text-on-background font-medium hover:bg-surface-variant rounded-md transition-colors">
                        <div className="p-1.5 bg-primary/10 rounded-md text-primary"><UploadCloud size={16} /></div> Subir archivo...
                    </button>}
                    {onAddResource && <button onClick={() => { onAddResource(contextMenu.flowPosition); setContextMenu(null); }} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md"><FileText size={16}/> Añadir recurso</button>}
                    <div className="h-px bg-border my-1.5 mx-2" />
                    <button onClick={() => handleCreateNode('text', contextMenu.flowPosition)} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><Type size={16} className="text-outline" /> Texto</button>

                    {/* CORRECCIÓN: El botón dispara la orden 'container' */}
                    <button onClick={() => handleCreateNode('container', contextMenu.flowPosition)} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><Layers size={16} className="text-outline" /> Contenedor / Grupo</button>

                    <button onClick={() => handleCreateNode('shape', contextMenu.flowPosition)} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><Square size={16} className="text-outline" /> Figura (Dibujo)</button>
                    <button onClick={() => handleCreateNode('link', contextMenu.flowPosition)} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><LinkIcon size={16} className="text-outline" /> Bookmark (Web)</button>
                    <button onClick={() => handleCreateNode('document', contextMenu.flowPosition)} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><FileText size={16} className="text-outline" /> Documento</button>
                    <button onClick={() => handleCreateNode('audio', contextMenu.flowPosition)} className="flex items-center gap-2 px-3 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors"><Music size={16} className="text-outline" /> Audio</button>
                </div>
            )}

        </div>
    );
}

export function CanvasEditor({ document, onReady, onAddResource, onDropResource, onDropFiles, onPickFiles }: { document?: DiagramDocument; onReady?: () => void; onAddResource?: (position?: { x: number; y: number }) => void; onDropResource?: (resourceId: string, position: { x: number; y: number }) => void; onDropFiles?: (files: File[], position: { x: number; y: number }) => void; onPickFiles?: (position?: { x: number; y: number }) => void }) {
    const loadDocument = useCanvasStore(state => state.loadDocument);
    useEffect(() => { if (document) { loadDocument(document.nodes, document.edges, document.viewport); onReady?.(); } }, [document, loadDocument, onReady]);
    return (
        <div className="w-full h-full relative" tabIndex={0} onKeyDown={event => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return; if (event.key.toLowerCase() === 'a' && onAddResource) { event.preventDefault(); onAddResource(); } if (event.key.toLowerCase() === 'u' && onPickFiles) { event.preventDefault(); onPickFiles(); } }}>
            <ReactFlowProvider>
                <CanvasCore viewport={document?.viewport} onAddResource={onAddResource} onDropResource={onDropResource} onDropFiles={onDropFiles} onPickFiles={onPickFiles} />
                <CanvasToolbar onAddResource={onAddResource} />
            </ReactFlowProvider>
        </div>
    );
}
