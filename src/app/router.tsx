import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { CanvasLayout } from '../layouts/CanvasLayout';
import { CanvasEditor } from '../features/canvas/CanvasEditor';
import { Placeholder } from '../components/ui/Placeholder';
import { Library } from '../pages/Library';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Placeholder title="Dashboard" />,
            },
            {
                path: 'library',
                element: <Library/>,
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
                element: <CanvasEditor />,
            }
        ]
    },
]);