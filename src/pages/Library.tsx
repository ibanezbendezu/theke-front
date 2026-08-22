import { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Link as LinkIcon, Film, Plus, Grid, List, Filter, Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/utils';

// Mock de datos para la interfaz
const mockFolders = [
    { id: '1', name: 'Recursos Proyecto A', count: 12 },
    { id: '2', name: 'Referencias Diseño', count: 5 },
];

const mockFiles = [
    { id: '1', name: 'Requerimientos.pdf', type: 'pdf', date: 'Hace 2 h', size: '2.4 MB' },
    { id: '2', name: 'Video Entrevista', type: 'video', date: 'Ayer', size: '150 MB' },
    { id: '3', name: 'Inspiración UI', type: 'link', date: '12 May', size: '--' },
    { id: '4', name: 'Logo Final.png', type: 'image', date: '10 May', size: '1.1 MB' },
];

export function Library() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="text-note-red" />;
            case 'video': return <Film className="text-note-purple" />;
            case 'link': return <LinkIcon className="text-note-blue" />;
            case 'image': return <ImageIcon className="text-note-green" />;
            default: return <FileText className="text-outline" />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-background p-8 max-w-7xl mx-auto">

            {/* Header Estilo Notion */}
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold text-on-background mb-1">Mi Biblioteca</h1>
                    <p className="text-sm text-on-surface-variant">Sube y organiza tus recursos para usarlos en el Canvas.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Plus}>Nueva Carpeta</Button>
                    <Button variant="primary" icon={Upload}>Subir Archivo</Button>
                </div>
            </header>

            {/* Controles de Búsqueda y Vista */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 max-w-md">
                    <Input placeholder="Buscar archivos, links o carpetas..." />
                </div>
                <Button variant="ghost" icon={Filter} size="sm">Filtrar</Button>
                <div className="flex border border-border rounded-md bg-background overflow-hidden p-0.5">
                    <button onClick={() => setViewMode('grid')} className={cn("p-1.5 rounded-sm transition-colors cursor-pointer", viewMode === 'grid' ? "bg-surface-variant text-on-background" : "text-outline hover:text-on-surface-variant")}>
                        <Grid size={16} />
                    </button>
                    <button onClick={() => setViewMode('list')} className={cn("p-1.5 rounded-sm transition-colors cursor-pointer", viewMode === 'list' ? "bg-surface-variant text-on-background" : "text-outline hover:text-on-surface-variant")}>
                        <List size={16} />
                    </button>
                </div>
            </div>

            {/* Contenido (Canva UX: Hover effects) */}
            <div className="flex-1 overflow-y-auto pb-12">

                {/* Sección de Carpetas */}
                <h2 className="text-sm font-semibold text-outline mb-4">CARPETAS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {mockFolders.map(folder => (
                        <div key={folder.id} className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/30 hover:bg-surface hover:border-outline/30 hover:shadow-sm transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center">
                                <Folder size={20} className="text-on-surface-variant" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-on-background group-hover:text-primary transition-colors">{folder.name}</h3>
                                <p className="text-xs text-on-surface-variant">{folder.count} elementos</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sección de Archivos (Grid o Lista) */}
                <h2 className="text-sm font-semibold text-outline mb-4">RECIENTES</h2>
                <div className={cn(
                    viewMode === 'grid'
                        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        : "flex flex-col gap-2"
                )}>
                    {mockFiles.map(file => (
                        <div key={file.id} className={cn(
                            "group relative flex border border-border bg-background hover:border-outline/50 hover:shadow-md transition-all cursor-pointer",
                            viewMode === 'grid' ? "flex-col p-4 rounded-xl items-center text-center hover:-translate-y-1" : "flex-row items-center gap-4 p-3 rounded-lg"
                        )}>
                            <div className={cn("flex items-center justify-center rounded-lg bg-surface/50", viewMode === 'grid' ? "w-16 h-16 mb-3" : "w-10 h-10")}>
                                {getFileIcon(file.type)}
                            </div>
                            <div className={cn("flex flex-col", viewMode === 'grid' ? "items-center" : "items-start flex-1")}>
                                <h3 className="text-sm font-medium text-on-background truncate w-full">{file.name}</h3>
                                <p className="text-xs text-on-surface-variant">{file.date} • {file.size}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}