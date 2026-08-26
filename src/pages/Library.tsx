import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Folder, FileText, Image as ImageIcon, Link as LinkIcon, Film, MoreHorizontal } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ViewToolbar } from '../components/ui/ViewToolbar'; // <--- Importamos el componente

const mockFolders = [
    { id: '1', name: 'Recursos Proyecto A', count: 12 },
    { id: '2', name: 'Referencias Diseño', count: 5 },
];

const mockFiles = [
    { id: '1', name: 'Requerimientos.pdf', type: 'pdf', date: 'Hace 2 h', size: '2.4 MB' },
    { id: '2', name: 'Video Entrevista', type: 'video', date: 'Ayer', size: '150 MB' },
    { id: '3', name: 'Inspiración UI', type: 'link', date: '12 May', size: '--' },
];

export function Library() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const navigate = useNavigate();
    const location = useLocation();

    const handleFolderClick = (folderName: string) => {
        const slug = folderName.toLowerCase().replace(/\s+/g, '-');
        navigate(`${location.pathname === '/' ? '' : location.pathname}/${slug}`);
    };

    const getIcon = (type: string, size = 24) => {
        switch (type) {
            case 'pdf': return <FileText size={size} className="text-[#E03E3E]" />;
            case 'video': return <Film size={size} className="text-[#D9730D]" />;
            case 'link': return <LinkIcon size={size} className="text-[#2383E2]" />;
            case 'image': return <ImageIcon size={size} className="text-[#0F7B6C]" />;
            default: return <Folder size={size} className="text-outline" />;
        }
    };

    return (
        <div className="w-full px-6 md:px-8 py-6 pb-32">

            {/* Barra Reutilizable */}
            <ViewToolbar
                viewMode={viewMode}
                setViewMode={setViewMode}
                onSort={() => console.log('Ordenar click')}
                onNew={() => console.log('Nuevo click')}
            />

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mockFolders.map(folder => (
                        <Card
                            key={folder.id}
                            title={folder.name}
                            subtitle={`${folder.count} elementos`}
                            icon={getIcon('folder', 32)}
                            onClick={() => handleFolderClick(folder.name)}
                        />
                    ))}
                    {mockFiles.map(file => (
                        <Card key={file.id} title={file.name} subtitle={file.date} icon={getIcon(file.type, 32)} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col text-[14px]">
                    <div className="flex items-center text-outline border-b border-border py-2 px-2 hover:bg-surface/30">
                        <div className="flex-1 font-medium">Nombre</div>
                        <div className="w-32 hidden md:block font-medium">Tipo</div>
                        <div className="w-32 hidden sm:block font-medium">Última edición</div>
                    </div>
                    {[...mockFolders.map(f => ({...f, type: 'folder', date: '--'})), ...mockFiles].map(item => (
                        <div
                            key={item.id}
                            onClick={() => item.type === 'folder' ? handleFolderClick(item.name) : undefined}
                            className="group flex items-center py-1.5 px-2 hover:bg-surface-variant border-b border-border/30 cursor-pointer transition-colors text-on-background"
                        >
                            <div className="flex-1 flex items-center gap-2 font-medium">
                                {getIcon(item.type, 18)}
                                <span>{item.name}</span>
                            </div>
                            <div className="w-32 hidden md:block"><Badge>{item.type}</Badge></div>
                            <div className="w-32 text-outline hidden sm:block text-[13px]">{item.date}</div>
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