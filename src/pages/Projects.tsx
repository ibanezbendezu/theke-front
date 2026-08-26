import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Folder, MoreHorizontal } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ViewToolbar } from '../components/ui/ViewToolbar'; // <--- Importamos el componente

const mockProjects = [
    { id: '1', name: 'Rediseño App Móvil', status: 'En progreso', lastEdited: 'Hace 2 h' },
    { id: '2', name: 'Arquitectura Backend', status: 'Planificación', lastEdited: 'Ayer' },
    { id: '3', name: 'Campaña Q3', status: 'Completado', lastEdited: '12 May' },
];

export function Projects() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const navigate = useNavigate();
    const location = useLocation();

    const handleFolderClick = (folderName: string) => {
        const slug = folderName.toLowerCase().replace(/\s+/g, '-');
        navigate(`${location.pathname === '/' ? '' : location.pathname}/${slug}`);
    };

    return (
        <div className="w-full px-6 md:px-8 py-6 pb-32">

            {/* Barra Reutilizable */}
            <ViewToolbar
                viewMode={viewMode}
                setViewMode={setViewMode}
                onSort={() => console.log('Ordenar proyectos')}
                onNew={() => console.log('Nuevo proyecto')}
            />

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockProjects.map(proj => (
                        <Card
                            key={proj.id}
                            title={proj.name}
                            subtitle={proj.lastEdited}
                            icon={<Folder size={32} className="text-outline" />}
                            onClick={() => handleFolderClick(proj.name)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col text-[14px]">
                    <div className="flex items-center text-outline border-b border-border py-2 px-2 hover:bg-surface/30">
                        <div className="flex-1 font-medium">Nombre</div>
                        <div className="w-32 hidden md:block font-medium">Estado</div>
                        <div className="w-32 hidden sm:block font-medium">Última edición</div>
                    </div>
                    {mockProjects.map(item => (
                        <div
                            key={item.id}
                            onClick={() => handleFolderClick(item.name)}
                            className="group flex items-center py-1.5 px-2 hover:bg-surface-variant border-b border-border/30 cursor-pointer transition-colors text-on-background"
                        >
                            <div className="flex-1 flex items-center gap-2 font-medium">
                                <Folder size={18} className="text-outline" />
                                <span>{item.name}</span>
                            </div>
                            <div className="w-32 hidden md:block">
                                <Badge>{item.status}</Badge>
                            </div>
                            <div className="w-32 text-outline hidden sm:block text-[13px]">{item.lastEdited}</div>
                            <div className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-border/50 rounded-[3px]">
                                <MoreHorizontal size={16} className="text-outline" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}