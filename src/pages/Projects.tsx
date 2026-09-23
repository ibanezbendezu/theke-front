import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Archive, Folder, MoreHorizontal, RotateCcw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ViewToolbar } from '../components/ui/ViewToolbar';
import { type Project, useProject, useProjectActions, useProjects } from '../data/useProjects';

const MAX_NAME_LENGTH = 120;

export function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [status, setStatus] = useState<'active' | 'archived'>('active');
  const [editing, setEditing] = useState<Project | 'new' | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.pathname.match(/^\/projects\/([^/]+)$/)?.[1];
  const detail = useProject(projectId);
  const query = useProjects(status);
  const actions = useProjectActions();
  const items = query.data?.pages.flatMap(page => page.data) ?? [];

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);
  const edit = (project: Project | 'new') => { setEditing(project); setName(project === 'new' ? '' : project.name); setError(''); };
  const close = () => { setEditing(null); setError(''); };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    const value = name.trim();
    if (!value || value.length > MAX_NAME_LENGTH) { setError(`Usa entre 1 y ${MAX_NAME_LENGTH} caracteres.`); return; }
    try {
      if (editing === 'new') await actions.create.mutateAsync(value);
      else if (editing) await actions.rename.mutateAsync({ id: editing.id, name: value });
      close();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'No se pudo guardar.'); }
  };

  if (projectId) return <section className="w-full px-6 md:px-8 py-6">
    <Button onClick={() => navigate('/projects')}>← Proyectos</Button>
    {detail.isPending && <p role="status" className="mt-5 text-outline">Cargando proyecto…</p>}
    {detail.isError && <div role="alert" className="mt-5"><p className="text-red-600">No se pudo abrir el proyecto.</p><Button variant="outline" onClick={() => detail.refetch()}>Reintentar</Button></div>}
    {detail.data && <><h1 className="mt-5 text-2xl font-semibold">{detail.data.name}</h1><p className="mt-2 text-outline">Proyecto listo para organizar recursos y diagramas.</p><Button className="mt-5" variant="outline" onClick={() => edit(detail.data)}>Renombrar</Button></>}
    {editing && <Editor name={name} setName={setName} error={error} busy={actions.rename.isPending} inputRef={inputRef} save={save} close={close} />}
  </section>;

  return <section className="w-full px-6 md:px-8 py-6 pb-32" aria-labelledby="projects-title">
    <div className="flex items-center justify-between gap-4 mb-4">
      <div><h1 id="projects-title" className="text-xl font-semibold">Proyectos</h1><p className="text-sm text-outline">Separa y retoma tus temas de trabajo.</p></div>
      <ViewToolbar viewMode={viewMode} setViewMode={setViewMode} onNew={() => edit('new')} />
    </div>
    <div className="flex gap-2 mb-5" aria-label="Estado de proyectos">
      <Button variant={status === 'active' ? 'secondary' : 'ghost'} onClick={() => setStatus('active')}>Activos</Button>
      <Button variant={status === 'archived' ? 'secondary' : 'ghost'} onClick={() => setStatus('archived')}>Archivados</Button>
    </div>
    {query.isPending && <p role="status" className="text-outline">Cargando proyectos…</p>}
    {query.isError && <div role="alert"><p className="text-red-600">No se pudieron cargar los proyectos.</p><Button variant="outline" onClick={() => query.refetch()}>Reintentar</Button></div>}
    {!query.isPending && !query.isError && items.length === 0 && <div className="rounded-lg border border-dashed border-border p-10 text-center">
      <Folder className="mx-auto text-outline" size={36} /><h2 className="mt-3 font-medium">{status === 'active' ? 'Aún no tienes proyectos' : 'No hay proyectos archivados'}</h2>
      <p className="mt-1 text-sm text-outline">{status === 'active' ? 'Un proyecto reúne el trabajo de un tema en un solo lugar.' : 'Los proyectos que archives aparecerán aquí.'}</p>
      {status === 'active' && <Button className="mt-4" variant="primary" onClick={() => edit('new')}>Crear primer proyecto</Button>}
    </div>}
    {items.length > 0 && (viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map(project => <div key={project.id}><Card title={project.name} subtitle={new Date(project.updatedAt).toLocaleDateString()} icon={<Folder size={32} />} onClick={() => navigate(`/projects/${project.id}`)} /><Actions project={project} status={status} rename={() => edit(project)} archive={() => { if (window.confirm(`¿Archivar “${project.name}”?`)) actions.archive.mutate(project.id); }} restore={() => actions.restore.mutate(project.id)} /></div>)}
    </div> : <div className="divide-y divide-border border-y border-border">
      {items.map(project => <div key={project.id} className="flex items-center gap-3 py-2"><button className="flex flex-1 items-center gap-2 text-left hover:underline focus-visible:outline-2" onClick={() => navigate(`/projects/${project.id}`)}><Folder size={18} />{project.name}</button><Actions project={project} status={status} rename={() => edit(project)} archive={() => { if (window.confirm(`¿Archivar “${project.name}”?`)) actions.archive.mutate(project.id); }} restore={() => actions.restore.mutate(project.id)} /></div>)}
    </div>)}
    {query.hasNextPage && <Button className="mt-5" variant="outline" disabled={query.isFetchingNextPage} onClick={() => query.fetchNextPage()}>{query.isFetchingNextPage ? 'Cargando…' : 'Cargar más'}</Button>}
    {editing && <Editor name={name} setName={setName} error={error} busy={actions.create.isPending || actions.rename.isPending} inputRef={inputRef} save={save} close={close} />}
  </section>;
}

function Actions({ project, status, rename, archive, restore }: { project: Project; status: 'active' | 'archived'; rename: () => void; archive: () => void; restore: () => void }) {
  return <div className="flex justify-end gap-1 mt-1"><Button size="icon" title={`Renombrar ${project.name}`} aria-label={`Renombrar ${project.name}`} icon={MoreHorizontal} onClick={rename} />{status === 'active' ? <Button size="icon" title={`Archivar ${project.name}`} aria-label={`Archivar ${project.name}`} icon={Archive} onClick={archive} /> : <Button size="icon" title={`Restaurar ${project.name}`} aria-label={`Restaurar ${project.name}`} icon={RotateCcw} onClick={restore} />}</div>;
}

function Editor({ name, setName, error, busy, inputRef, save, close }: { name: string; setName: (value: string) => void; error: string; busy: boolean; inputRef: React.RefObject<HTMLInputElement | null>; save: (event: FormEvent) => void; close: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}><div role="dialog" aria-modal="true" aria-labelledby="project-editor-title" className="w-full max-w-md rounded-lg border border-border bg-background p-5 shadow-xl"><h2 id="project-editor-title" className="text-lg font-semibold">Nombre del proyecto</h2><form className="mt-4" onSubmit={save}><Input ref={inputRef} icon={undefined} value={name} maxLength={MAX_NAME_LENGTH + 1} aria-invalid={Boolean(error)} aria-describedby={error ? 'project-name-error' : undefined} onChange={event => setName(event.target.value)} />{error && <p id="project-name-error" role="alert" className="mt-2 text-sm text-red-600">{error}</p>}<div className="mt-5 flex justify-end gap-2"><Button type="button" onClick={close}>Cancelar</Button><Button type="submit" variant="primary" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</Button></div></form></div></div>;
}
