import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { CanvasLayout } from '../layouts/CanvasLayout';
import { CanvasEditor } from '../features/canvas/CanvasEditor';
import { Placeholder } from '../components/ui/Placeholder';
import { Dashboard } from '../pages/Dashboard';
import { Library } from '../pages/Library';
import { Projects } from '../pages/Projects';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: 'library/*',
                element: <Library/>,
            },
            {
                path: 'projects/*',
                element: <Projects/>,
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