import { Menu, MoreHorizontal } from 'lucide-react';

interface TopbarProps {
    isSidebarOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

export function Topbar({ isSidebarOpen, setIsOpen }: TopbarProps) {
    return (
        <header className="flex items-center justify-between h-12 px-3 w-full flex-shrink-0 bg-background text-on-background">

            {/* LADO IZQUIERDO: Breadcrumbs y Botón Hamburguesa */}
            <div className="flex items-center gap-1 overflow-hidden">
                {/* Si el sidebar está cerrado, el menú hamburguesa aparece aquí (estilo Notion) */}
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-1.5 mr-1 rounded-[4px] hover:bg-surface-variant text-outline hover:text-on-background transition-colors"
                        title="Abrir menú"
                    >
                        <Menu size={18} />
                    </button>
                )}

                {/* Ruta de navegación (Breadcrumbs) - Datos basados en tu mockup */}
                <div className="flex items-center text-[14px]">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] hover:bg-surface-variant cursor-pointer transition-colors max-w-[150px]">
                        <span className="font-medium truncate">Aarón's Notion HQ</span>
                    </div>

                    <span className="text-outline/40 mx-0.5 select-none">/</span>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] hover:bg-surface-variant cursor-pointer transition-colors max-w-[150px]">
                        <span className="font-medium truncate">Conquistadores</span>
                    </div>

                    <span className="text-outline/40 mx-0.5 select-none">/</span>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] hover:bg-surface-variant cursor-pointer transition-colors max-w-[150px]">
                        <span className="font-medium truncate">Content</span>
                    </div>
                </div>
            </div>

            {/* LADO DERECHO: Acciones */}
            <div className="flex items-center gap-1 flex-shrink-0 text-outline">
                <button className="p-1.5 rounded-[4px] hover:bg-surface-variant transition-colors" title="Options">
                    <MoreHorizontal size={18} />
                </button>
            </div>

        </header>
    );
}