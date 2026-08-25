import { useCallback, useRef, useState } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    type NodeTypes,
    ReactFlowProvider,
    useReactFlow
} from '@xyflow/react';
import { Type, Image as ImageIcon } from 'lucide-react'; // Íconos para nuestro menú
import { useCanvasStore } from '../../store/useCanvasStore';
import { MediaNode } from './nodes/MediaNode';
import { TextNode } from './nodes/TextNode';
import { CanvasToolbar } from './CanvasToolbar'; // <--- 1. Importa la barra
import { EditableEdge } from './edges/EditableEdge';

const nodeTypes: NodeTypes = {
    media: MediaNode,
    text: TextNode,
};

const edgeTypes = {
    editable: EditableEdge,
};

function CanvasCore() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useCanvasStore();
    const { screenToFlowPosition } = useReactFlow();

    // 1. Referencia para recordar de qué nodo comenzamos a arrastrar la línea
    const connectingNodeId = useRef<string | null>(null);

    // 2. Estado para controlar la visibilidad y posición de nuestro menú estilo Notion
    const [menu, setMenu] = useState<{
        isOpen: boolean;
        x: number;
        y: number;
        flowPosition: { x: number; y: number } | null;
    }>({ isOpen: false, x: 0, y: 0, flowPosition: null });

    // 3. Manejo de clics en el fondo del lienzo
    const onPaneClick = useCallback((event: React.MouseEvent) => {
        // Si el menú está abierto y hacemos clic fuera, lo cerramos
        setMenu((m) => ({ ...m, isOpen: false }));

        // La función de doble clic que hicimos antes
        if (event.detail === 2) {
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            addNode({
                id: crypto.randomUUID(),
                type: 'text',
                position,
                data: { text: '' },
            });
        }
    }, [screenToFlowPosition, addNode]);

    // 4. Se dispara cuando empezamos a arrastrar una línea desde un punto de conexión
    const onConnectStart = useCallback((_: any, { nodeId }: { nodeId: string | null }) => {
        connectingNodeId.current = nodeId;
    }, []);

    // 5. Se dispara cuando soltamos la línea
    const onConnectEnd = useCallback((event: any) => {
        // Verificamos si soltamos el mouse sobre el fondo ('react-flow__pane')
        const target = event.target as Element;
        const targetIsPane = target.classList.contains('react-flow__pane');

        if (targetIsPane && connectingNodeId.current) {
            // Extraemos las coordenadas de la pantalla (funciona en mouse y pantallas táctiles)
            const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;

            // Mostramos el menú exactamente en la punta del cursor
            setMenu({
                isOpen: true,
                x: clientX,
                y: clientY,
                flowPosition: screenToFlowPosition({ x: clientX, y: clientY }),
            });
        }
    }, [screenToFlowPosition]);

    // 6. Función que se ejecuta al elegir una opción en nuestro menú
    const handleCreateNode = (type: 'text' | 'media') => {
        if (!menu.flowPosition || !connectingNodeId.current) return;

        const newNodeId = crypto.randomUUID();

        // Creamos el nodo en la posición donde soltamos el mouse
        addNode({
            id: newNodeId,
            type,
            position: menu.flowPosition,
            data: type === 'text'
                ? { text: '' }
                : { label: 'Nueva Imagen', type: 'image', url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600' },
        });

        // Conectamos automáticamente el nodo viejo con el nuevo
        onConnect({
            source: connectingNodeId.current,
            target: newNodeId,
            sourceHandle: null,
            targetHandle: null,
        });

        // Limpiamos el estado y cerramos el menú
        setMenu({ isOpen: false, x: 0, y: 0, flowPosition: null });
        connectingNodeId.current = null;
    };

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes} // <--- 3. Le pasamos el diccionario a React Flow
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart} // Escuchamos el inicio
                onConnectEnd={onConnectEnd}     // Escuchamos el final
                onPaneClick={onPaneClick}
                fitView
                className="bg-background"
                minZoom={0.1}
            >
                <Background color="var(--color-border)" gap={24} size={2} />
                <Controls className="bg-surface border-border fill-on-surface-variant" />
                <MiniMap
                    nodeColor={(node) => {
                        if (node.type === 'media') return 'var(--color-note-purple)';
                        if (node.type === 'text') return 'var(--color-background)';
                        return node.style?.backgroundColor as string || 'var(--color-surface-variant)';
                    }}
                    maskColor="var(--color-background)"
                    className="bg-surface border border-border rounded-md shadow-sm"
                />
            </ReactFlow>

            {/* MENÚ CONTEXTUAL FLOTANTE (Se renderiza sobre el canvas) */}
            {menu.isOpen && (
                <div
                    className="fixed z-50 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden flex flex-col p-1"
                    style={{ top: menu.y, left: menu.x }} // Posición dinámica
                >
                    <span className="text-[10px] font-bold text-outline px-2 py-2 uppercase tracking-wider">
                        Crear e Insertar
                    </span>
                    <button
                        onClick={() => handleCreateNode('text')}
                        className="flex items-center gap-2 px-2 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors text-left cursor-pointer"
                    >
                        <Type size={16} className="text-primary" />
                        Nodo de Texto
                    </button>
                    <button
                        onClick={() => handleCreateNode('media')}
                        className="flex items-center gap-2 px-2 py-2 text-sm text-on-background hover:bg-surface-variant rounded-md transition-colors text-left cursor-pointer"
                    >
                        <ImageIcon size={16} className="text-note-green" />
                        Media (Demo)
                    </button>
                </div>
            )}
        </div>
    );
}

export function CanvasEditor() {
    return (
        <div className="w-full h-full relative">
            <ReactFlowProvider>
                <CanvasCore />
                <CanvasToolbar /> {/* <--- 2. Inyéctala aquí */}
            </ReactFlowProvider>
        </div>
    );
}