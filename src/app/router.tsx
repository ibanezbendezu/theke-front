import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { CanvasLayout } from '../layouts/CanvasLayout';
import { CanvasEditor } from '../features/canvas/CanvasEditor';

// Placeholder temporal para las páginas que aún no creamos
const Placeholder = ({ title }: { title: string }) => (
    <div className="flex flex-col h-full p-12">
        <h1 className="text-4xl font-semibold text-on-background mb-4">{title}</h1>
        <p className="text-on-surface-variant">Esta página se construirá en la carpeta src/pages/</p>
    </div>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />, // Usa el layout con la barra lateral
        children: [
            {
                index: true,
                element: <Placeholder title="Dashboard" />,
            },
            {
                path: 'library',
                element: <Placeholder title="Mi Biblioteca" />,
            },
            {
                path: 'explore',
                element: <Placeholder title="Comunidad" />,
            },
        ],
    },
    {
        path: '/canvas',
        element: <CanvasLayout />,
        children: [
            {
                path: ':id',
                element: <CanvasEditor />, // <--- ¡Aquí lo conectamos!
            }
        ]
    },
]);