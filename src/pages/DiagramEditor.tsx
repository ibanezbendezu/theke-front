import { ChevronLeft, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useDiagram } from '../data/useDiagrams';
import { DiagramWorkspace } from './DiagramWorkspace';
import { CanvasEditor } from '../features/canvas/CanvasEditor';
import { CanvasResourcePanel, CanvasResourcePicker } from '../features/canvas/CanvasResources';
import { useCanvasStore } from '../store/useCanvasStore';
import { useCanvasUploadBatches } from '../features/canvas/useCanvasUploadBatches';
import { CanvasUploadTray } from '../features/canvas/CanvasUploadTray';
import { CanvasDialog } from '../features/canvas/CanvasDialog';

export function DiagramEditor() {
  const { diagramId } = useParams();
  return <DiagramEditorCore key={diagramId} />;
}

function DiagramEditorCore() {
  const { projectId, diagramId } = useParams(); const navigate = useNavigate(); const diagram = useDiagram(diagramId); const [leftOpen, setLeftOpen] = useState(true); const [rightOpen, setRightOpen] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false); const [preferred, setPreferred] = useState<{ x: number; y: number } | undefined>(); const [duplicate, setDuplicate] = useState<{ resourceId: string; position?: { x: number; y: number } } | null>(null);
  const [readyDiagramId, setReadyDiagramId] = useState<string | null>(null);
  const [uploadPickerOpen, setUploadPickerOpen] = useState(false); const [uploadPosition, setUploadPosition] = useState({ x: 0, y: 0 });
  const canvasReady = useCallback(() => setReadyDiagramId(diagramId ?? null), [diagramId]);
  const uploads = useCanvasUploadBatches(); const fileInput = useRef<HTMLInputElement>(null);
  const pickFiles = (position?: { x: number; y: number }) => { const viewport = useCanvasStore.getState().viewport; setUploadPosition(position ?? { x: Math.round((window.innerWidth / 2 - viewport.x) / viewport.zoom), y: Math.round((window.innerHeight / 2 - viewport.y) / viewport.zoom) }); setUploadPickerOpen(true); };
  const uploadAt = (files: File[], position?: { x: number; y: number }) => { const viewport = useCanvasStore.getState().viewport; uploads.addFiles(files, position ?? { x: (window.innerWidth / 2 - viewport.x) / viewport.zoom, y: (window.innerHeight / 2 - viewport.y) / viewport.zoom }); };
  const nodes = useCanvasStore(state => state.nodes); const usedIds = new Set(nodes.map(node => node.data?.resourceId).filter((id): id is string => typeof id === 'string'));
  const openPicker = (position?: { x: number; y: number }) => { setPreferred(position); setPickerOpen(true); };
  const addDirect = (resourceId: string, position?: { x: number; y: number }) => { useCanvasStore.getState().addResourceRepresentation(resourceId, position); setDuplicate(null); setPickerOpen(false); };
  const tryAdd = (resourceId: string, position?: { x: number; y: number }) => { if (usedIds.has(resourceId)) setDuplicate({ resourceId, position }); else addDirect(resourceId, position); };
  const focusExisting = (resourceId: string) => { const existing = useCanvasStore.getState().nodes.find(node => node.data?.resourceId === resourceId); if (existing) useCanvasStore.getState().focusNode(existing.id); setDuplicate(null); setPickerOpen(false); };
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
        {!diagram.data.archivedAt && <Button size="icon" title="Cargar archivos en el canvas" aria-label="Cargar archivos en el canvas" icon={Upload} onClick={() => pickFiles()} />}
      </nav>
      {leftOpen && (diagram.data.archivedAt ? <aside className="w-56 shrink-0 border-r border-border p-3">Recursos</aside> : readyDiagramId === diagram.data.id ? <CanvasResourcePanel projectId={diagram.data.projectId} onAdd={() => openPicker()} onSelect={id => tryAdd(id)} /> : <aside className="w-56 shrink-0 border-r border-border p-3 text-xs text-outline">Cargando recursos del canvas…</aside>)}
      <section className="min-w-0 flex-1" aria-label="Lienzo">{diagram.data.archivedAt ? <div className="relative h-full"><div className="pointer-events-none h-full"><CanvasEditor document={diagram.data.document} /></div><p role="status" className="absolute right-3 top-3 rounded border border-border bg-background px-3 py-2 text-sm">Diagrama archivado. Restáuralo desde el proyecto para editar.</p></div> : <DiagramWorkspace diagram={diagram.data} refetch={diagram.refetch} onAddResource={openPicker} onDropResource={tryAdd} onDropFiles={uploadAt} onPickFiles={pickFiles} onCanvasReady={canvasReady} />}</section>
      {rightOpen && <aside className="w-[304px] shrink-0 overflow-auto border-l border-border p-3" aria-label="Propiedades"><h2 className="text-sm font-semibold">Propiedades</h2><p className="mt-2 text-xs text-outline">Selecciona un elemento para editarlo.</p></aside>}
    </div>
    {pickerOpen && <CanvasResourcePicker projectId={diagram.data.projectId} usedIds={usedIds} onClose={() => setPickerOpen(false)} onSelect={id => tryAdd(id, preferred)} onFocus={focusExisting} />}
    {duplicate && <CanvasDialog titleId="duplicate-resource-title" onClose={() => setDuplicate(null)} className="max-w-md"><h2 id="duplicate-resource-title" className="font-semibold">Este recurso ya está en el diagrama</h2><p className="mt-2 text-sm text-outline">Puedes ir a su representación o añadir otra independiente.</p><div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => focusExisting(duplicate.resourceId)}>Ir al uso</Button><Button variant="primary" onClick={() => addDirect(duplicate.resourceId, duplicate.position)}>Añadir otra representación</Button><Button onClick={() => setDuplicate(null)}>Cancelar</Button></div></CanvasDialog>}
    {uploadPickerOpen && <CanvasDialog titleId="upload-position-title" onClose={() => setUploadPickerOpen(false)} className="max-w-sm"><h2 id="upload-position-title" className="font-semibold">Cargar en el canvas</h2><p className="mt-2 text-sm text-outline">Indica la ubicación inicial o usa el centro visible.</p><div className="mt-4 flex gap-2"><label className="text-sm">X<input type="number" className="mt-1 w-full rounded border border-border bg-background p-2" value={uploadPosition.x} onChange={event => setUploadPosition(value => ({ ...value, x: Number(event.target.value) }))}/></label><label className="text-sm">Y<input type="number" className="mt-1 w-full rounded border border-border bg-background p-2" value={uploadPosition.y} onChange={event => setUploadPosition(value => ({ ...value, y: Number(event.target.value) }))}/></label></div><div className="mt-4 flex justify-end gap-2"><Button onClick={() => setUploadPickerOpen(false)}>Cancelar</Button><Button variant="primary" onClick={() => fileInput.current?.click()}>Seleccionar archivos</Button></div></CanvasDialog>}
    <input ref={fileInput} className="sr-only" type="file" multiple aria-label="Seleccionar archivos para el canvas" onChange={event => { if (event.target.files?.length) { uploadAt([...event.target.files], uploadPosition); setUploadPickerOpen(false); } event.target.value = ''; }} />
    <CanvasUploadTray batches={uploads.batches} retry={uploads.retry} undo={uploads.undo} />
  </main>;
}
