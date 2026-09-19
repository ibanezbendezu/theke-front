import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar'; // <--- Importamos la barra

export function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">

            {/* Sidebar Modularizado */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Contenedor Principal */}
            <main className="flex-1 flex flex-col h-full min-w-0 bg-background">

                {/* Barra Superior estilo Notion (Breadcrumbs y opciones) */}
                <Topbar isSidebarOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                {/* Área de contenido desplazable (Dashboard, Library, etc.) */}
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>

            </main>
        </div>
    );
}