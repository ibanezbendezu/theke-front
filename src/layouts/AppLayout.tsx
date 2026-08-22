import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, LucideFolder, Globe, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

// 1. EXTRAEMOS EL COMPONENTE (ahora vive fuera de AppLayout)
// 2. Definimos sus tipos exactos para eliminar el "any"
interface NavItemProps {
    to: string;
    icon: React.ElementType; // Usamos el tipo correcto para íconos de Lucide
    label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
    // NavItem puede usar sus propios hooks
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                "hover:bg-surface-variant hover:text-on-background",
                isActive ? "bg-surface-variant text-on-background" : "text-on-surface-variant"
            )}
        >
            <Icon size={18} className={isActive ? "text-on-background" : "text-outline"} />
            {label}
        </Link>
    );
};

export function AppLayout() {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            <aside className="w-64 flex-shrink-0 border-r border-border bg-surface/50 flex flex-col">
                <div className="p-4 flex items-center gap-3 hover:bg-surface-variant cursor-pointer transition-colors">
                    <div className="w-6 h-6 rounded bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                        A
                    </div>
                    <span className="text-sm font-semibold truncate">Mi Espacio de Trabajo</span>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                    <NavItem to="/" icon={LayoutGrid} label="Dashboard" />
                    <NavItem to="/library" icon={LucideFolder} label="Mi Biblioteca" />
                    <NavItem to="/explore" icon={Globe} label="Explorar Comunidad" />

                    <div className="pt-6 pb-2 px-3 text-xs font-semibold text-outline">
                        FAVORITOS
                    </div>
                    <Link to="/canvas/demo" className="group flex items-center justify-between px-3 py-1.5 rounded-md text-sm text-on-surface-variant hover:bg-surface-variant transition-colors">
                        <span className="truncate">🎯 Mapa Mental Fase 1</span>
                    </Link>
                </nav>

                <div className="p-2 border-t border-border mt-auto">
                    <NavItem to="/settings" icon={Settings} label="Configuración" />
                </div>
            </aside>

            <main className="flex-1 h-full overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}