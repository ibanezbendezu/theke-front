import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';

export function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">

            {/* Botón flotante hamburguesa (aparece solo cuando el Sidebar está cerrado) */}
            {!isSidebarOpen && (
                <div className="absolute top-4 left-4 z-50">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-1 rounded-[4px] hover:bg-surface-variant text-outline hover:text-on-background transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            )}

            {/* Sidebar Modularizado */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Contenido Principal (Dashboard, Library, etc.) */}
            <main className="flex-1 h-full overflow-y-auto bg-background">
                <Outlet />
            </main>
        </div>
    );
}