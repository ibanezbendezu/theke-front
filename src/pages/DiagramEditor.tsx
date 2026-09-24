import { ChevronLeft, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useDiagram } from '../data/useDiagrams';
import { DiagramWorkspace } from './DiagramWorkspace';
import { CanvasEditor } from '../features/canvas/CanvasEditor';

export function DiagramEditor() {
  const { projectId, diagramId } = useParams(); const navigate = useNavigate(); const diagram = useDiagram(diagramId); const [leftOpen, setLeftOpen] = useState(true); const [rightOpen, setRightOpen] = useState(true);
  if (diagram.isPending) return <p role="status" className="p-6">Cargando diagrama…</p>;
  if (diagram.isError || !diagram.data) return <div role="alert" className="p-6"><p>No se pudo abrir el diagrama.</p><Button className="mt-3" onClick={() => diagram.refetch()}>Reintentar</Button></div>;
  return <main className="flex h-screen min-h-0 flex-col bg-background text-on-background">
    <header className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-2">
      <Button size="icon" title="Volver al proyecto" aria-label="Volver al proyecto" icon={ChevronLeft} onClick={() => navigate(`/projects/${projectId}`)} />
      <h1 className="min-w-0 flex-1 truncate text-sm font-semibold">{diagram.data.name}</h1><ThemeToggle />
    </header>
    <div className="flex min-h-0 flex-1">
      <nav aria-label="Herramientas del editor" className="flex w-10 shrink-0 flex-col items-center gap-1 border-r border-border bg-surface-variant/80 py-1 supports-[not(backdrop-filter:blur(1px))]:bg-background">
        <Button size="icon" title={leftOpen ? 'Ocultar recursos' : 'Mostrar recursos'} aria-label={leftOpen ? 'Ocultar recursos' : 'Mostrar recursos'} icon={leftOpen ? PanelLeftClose : PanelLeftOpen} onClick={() => setLeftOpen(value => !value)} />
        <Button size="icon" title={rightOpen ? 'Ocultar propiedades' : 'Mostrar propiedades'} aria-label={rightOpen ? 'Ocultar propiedades' : 'Mostrar propiedades'} icon={rightOpen ? PanelRightClose : PanelRightOpen} onClick={() => setRightOpen(value => !value)} />
      </nav>
      {leftOpen && <aside className="w-56 shrink-0 overflow-auto border-r border-border p-3" aria-label="Recursos"><h2 className="text-sm font-semibold">Recursos</h2><p className="mt-2 text-xs text-outline">Arrastra recursos al lienzo para crear nodos.</p></aside>}
      <section className="min-w-0 flex-1" aria-label="Lienzo">{diagram.data.archivedAt ? <div className="relative h-full"><div className="pointer-events-none h-full"><CanvasEditor document={diagram.data.document} /></div><p role="status" className="absolute right-3 top-3 rounded border border-border bg-background px-3 py-2 text-sm">Diagrama archivado. Restáuralo desde el proyecto para editar.</p></div> : <DiagramWorkspace diagram={diagram.data} refetch={diagram.refetch} />}</section>
      {rightOpen && <aside className="w-[304px] shrink-0 overflow-auto border-l border-border p-3" aria-label="Propiedades"><h2 className="text-sm font-semibold">Propiedades</h2><p className="mt-2 text-xs text-outline">Selecciona un elemento para editarlo.</p></aside>}
    </div>
  </main>;
}
