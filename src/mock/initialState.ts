import { type Node as FlowNode, type Edge } from '@xyflow/react';

export const initialNodes: FlowNode[] = [
    {
        id: '1',
        type: 'default',
        position: { x: 250, y: 100 },
        data: { label: '👋 ¡Bienvenido a tu nuevo lienzo!' },
        style: {
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-on-background)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }
    },
    {
        id: 'media-1',
        type: 'media', // Llamamos a nuestro componente personalizado
        position: { x: 100, y: 500 },
        data: {
            label: 'Demo de Interfaz.mp4',
            type: 'video',
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' // Video de prueba público
        },
    },
    {
        id: 'media-2',
        type: 'media',
        position: { x: 450, y: 500 },
        data: {
            label: 'Referencia Diseño.jpg',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600' // Imagen de prueba
        },
    }
];

export const initialEdges: Edge[] = [];