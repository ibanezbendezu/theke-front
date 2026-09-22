import { Menu, Home, Folder, FileText, LogOut } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import React from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useCurrentAccount } from '../../data/useCurrentAccount';
import { clearPrivateCache } from '../../data/queryClient';

interface TopbarProps {
    isSidebarOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

// Mapeo para traducir las rutas base a español con sus iconos
const routeDictionary: Record<string, { name: string, icon: React.ElementType }> = {
    'library': { name: 'Biblioteca', icon: FileText },
    'projects': { name: 'Proyectos', icon: Folder },
};

export function Topbar({ isSidebarOpen, setIsOpen }: TopbarProps) {
    const location = useLocation();
    const { signOut } = useClerk();
    const account = useCurrentAccount();

    // Convertimos la URL "/library/conquistadores" en un array: ['library', 'conquistadores']
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <header className="flex items-center justify-between h-12 px-3 w-full flex-shrink-0 bg-background text-on-background border-b border-border/30">

            <div className="flex items-center gap-1 overflow-hidden">
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-1.5 mr-1 rounded-[4px] hover:bg-surface-variant text-outline hover:text-on-background transition-colors"
                        title="Abrir menú"
                    >
                        <Menu size={18} />
                    </button>
                )}

                {/* Contenedor del Breadcrumb */}
                <div className="flex items-center text-[14px]">
                    {/* El nodo raíz siempre fijo */}
                    <Link to="/" className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] hover:bg-surface-variant cursor-pointer transition-colors max-w-[150px]">
                        <Home size={16} className="text-outline flex-shrink-0" />
                        <span className="font-medium truncate">{account.data?.account.name ?? 'Espacio privado'}</span>
                    </Link>

                    {/* Mapeo dinámico del resto de la ruta */}
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isKnownRoute = routeDictionary[value];

                        // Si es una ruta base conocida, usamos su diccionario. Si es una carpeta dinámica, capitalizamos el nombre.
                        const name = isKnownRoute ? isKnownRoute.name : decodeURIComponent(value).charAt(0).toUpperCase() + decodeURIComponent(value).slice(1);
                        const Icon = isKnownRoute ? isKnownRoute.icon : Folder;

                        return (
                            <React.Fragment key={to}>
                                <span className="text-outline/40 mx-0.5 select-none">/</span>
                                <Link to={to} className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] hover:bg-surface-variant cursor-pointer transition-colors max-w-[150px]">
                                    <Icon size={16} className={`${isKnownRoute ? 'text-outline' : 'text-primary'} flex-shrink-0`} />
                                    <span className="font-medium truncate">{name}</span>
                                </Link>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0 text-outline">
                <span className="hidden sm:block max-w-48 truncate text-sm text-on-background">
                    {account.data?.user.displayName ?? account.data?.user.email ?? 'Cuenta'}
                </span>
                <button className="p-2 rounded-[4px] hover:bg-surface-variant transition-colors focus-visible:outline-2 focus-visible:outline-primary" aria-label="Cerrar sesión" title="Cerrar sesión" onClick={async () => { clearPrivateCache(); await signOut({ redirectUrl: '/access' }); }}>
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
}
