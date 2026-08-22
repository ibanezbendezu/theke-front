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
    }
];

export const initialEdges: Edge[] = [];