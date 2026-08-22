import { Plus, Clock, LayoutTemplate } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const mockCanvases = [
    { id: '1', title: 'Arquitectura Fase 1', lastEdited: 'Hace 2 horas', type: 'Lienzo' },
    { id: '2', title: 'Lluvia de ideas - UI/UX', lastEdited: 'Ayer', type: 'Lienzo' },
];

export function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="max-w-[900px] mx-auto px-12 py-16 pb-32">
            <Breadcrumb items={[{ label: 'Mi Espacio' }, { label: 'Inicio' }]} />

            <header className="mb-10">
                <h1 className="text-[40px] font-bold text-on-background leading-tight mb-2">Inicio</h1>
                <div className="flex items-center gap-2 mt-4">
                    <Button variant="secondary" icon={LayoutTemplate}>Plantillas</Button>
                    <Button variant="primary" icon={Plus} onClick={() => navigate('/canvas/new')}>Nuevo Lienzo</Button>
                </div>
            </header>

            <div className="space-y-6">
                <div>
                    <h2 className="text-[14px] font-medium text-outline mb-3 flex items-center gap-2 border-b border-border pb-2">
                        <Clock size={16} /> Vistos recientemente
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockCanvases.map((canvas) => (
                            <Card
                                key={canvas.id}
                                title={canvas.title}
                                subtitle={`Editado ${canvas.lastEdited}`}
                                icon={<LayoutTemplate size={32} />}
                                onClick={() => navigate(`/canvas/${canvas.id}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}