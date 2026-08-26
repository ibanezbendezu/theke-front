import { List, LayoutGrid, ArrowUpDown, Plus } from 'lucide-react';

interface ViewToolbarProps {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    onSort?: () => void;
    onNew?: () => void;
}

export function ViewToolbar({ viewMode, setViewMode, onSort, onNew }: ViewToolbarProps) {
    return (
        <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-1.5">

                {/* Selector de Vistas (List / Grid) */}
                <div className="flex items-center bg-surface-variant rounded-md p-0.5 border border-border mr-1">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1 rounded-[4px] transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm text-on-background' : 'text-outline hover:text-on-background'}`}
                        title="Vista de lista"
                    >
                        <List size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1 rounded-[4px] transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm text-on-background' : 'text-outline hover:text-on-background'}`}
                        title="Vista de galería"
                    >
                        <LayoutGrid size={16} />
                    </button>
                </div>

                {/* Acciones Rápidas (Íconos) */}
                <button
                    onClick={onSort}
                    className="p-1.5 rounded-md text-outline hover:text-on-background hover:bg-surface-variant transition-colors"
                    title="Ordenar"
                >
                    <ArrowUpDown size={16} />
                </button>

                <button
                    onClick={onNew}
                    className="p-1.5 rounded-md text-[#2383E2] hover:bg-[#2383E2]/10 transition-colors"
                    title="Nuevo elemento"
                >
                    <Plus size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}