import React from 'react';
import { LayoutGrid, FileText, Globe, Folder, ChevronsLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// 1. Este es el NavItem que extrajimos
interface NavItemProps {
    to: string;
    icon: React.ElementType;
    label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-[4px] text-[14px] font-medium transition-colors",
                "hover:bg-surface-variant text-on-background",
                isActive ? "bg-surface-variant font-semibold" : "text-outline hover:text-on-background"
            )}
        >
            <Icon size={16} className={cn("flex-shrink-0", isActive ? "text-on-background" : "text-outline")} strokeWidth={2} />
            <span className="truncate">{label}</span>
        </Link>
    );
};

// 2. Y este es el Sidebar principal que usa el NavItem
export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    return (
        <aside
            className={cn(
                "group relative flex-shrink-0 bg-surface flex flex-col transition-all duration-300 ease-in-out border-r border-border/50",
                isOpen ? "w-[240px]" : "w-0 opacity-0 overflow-hidden border-none"
            )}
        >
            <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-border/50"
                icon={ChevronsLeft}
            />

            {/* Selector de Espacio de Trabajo */}
            <div className="px-3 py-3 flex items-center gap-2 hover:bg-surface-variant cursor-pointer transition-colors mt-1">
                <div className="w-5 h-5 rounded-[3px] bg-primary text-white flex items-center justify-center text-[10px] font-bold">A</div>
                <span className="text-[14px] font-semibold truncate text-on-background">Mi Espacio</span>
            </div>

            {/* Acciones Rápidas */}
            <div className="px-2 mb-4 mt-2 space-y-0.5">
                <div className="px-1"><Input placeholder="Buscar..." /></div>
                <NavItem to="/explore" icon={Globe} label="Explorar" />
            </div>

            {/* Navegación usando el componente NavItem */}
            <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
                <div className="pt-2 pb-1 px-3 text-[11px] font-semibold text-outline tracking-wider">MI UNIDAD</div>
                <NavItem to="/" icon={LayoutGrid} label="Inicio" />
                <NavItem to="/library" icon={FileText} label="Biblioteca" />
                <NavItem to="/projects" icon={Folder} label="Proyectos" />
            </nav>
        </aside>
    );
}