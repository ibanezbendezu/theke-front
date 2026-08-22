import { useState } from 'react';
import { Folder, Plus, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';

const mockProjects = [
    { id: '1', name: 'Rediseño App Móvil', status: 'En progreso', lastEdited: 'Hace 2 h' },
    { id: '2', name: 'Arquitectura Backend', status: 'Planificación', lastEdited: 'Ayer' },
    { id: '3', name: 'Campaña Q3', status: 'Completado', lastEdited: '12 May' },
];

export function Projects() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Default en grid para variar

    return (
        <div className="w-full px-10 md:px-16 py-12 pb-32">

            <Breadcrumb items={[{ label: 'Mi Espacio' }, { label: 'Proyectos' }]} />

            <div className="flex items-center justify-between border-b border-border pb-1 mb-4">
                <div className="flex items-center gap-1">
                    <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} onClick={() => setViewMode('list')}>Tabla</Button>
                    <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} onClick={() => setViewMode('grid')}>Galería</Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="text-outline hover:text-on-background" icon={ArrowUpDown}>Ordenar</Button>
                    <Button variant="ghost" className="text-[#2383E2]" icon={Plus}>Nuevo</Button>
                </div>
            </div>

            {/* Vistas */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockProjects.map(proj => (
                        <Card
                            key={proj.id}
                            title={proj.name}
                            subtitle={proj.lastEdited}
                            icon={<Folder size={32} className="text-outline" />}
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
                        <div key={item.id} className="group flex items-center py-1.5 px-2 hover:bg-surface-variant border-b border-border/30 cursor-pointer transition-colors text-on-background">
                            <div className="flex-1 flex items-center gap-2 font-medium">
                                <Folder size={18} className="text-outline" />
                                <span>{item.name}</span>
                            </div>
                            <div className="w-32 hidden md:block">
                                {/* Puedes agregar colores dinámicos al badge según el estado si lo deseas */}
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