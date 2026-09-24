import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useOrganization } from '../../data/useOrganization';
import { useResources } from '../../data/useResources';
import { CanvasDialog } from './CanvasDialog';

export function CanvasResourcePanel({ projectId, onAdd, onSelect }: { projectId: string; onAdd: () => void; onSelect: (id: string) => void }) {
  const organization = useOrganization(projectId);
  return <aside className="w-56 shrink-0 overflow-auto border-r border-border p-3" aria-label="Recursos"><h2 className="text-sm font-semibold">Recursos</h2><Button variant="primary" className="mt-3 w-full" onClick={onAdd}>Añadir recurso</Button><p className="mt-3 text-xs text-outline">Recursos de este proyecto. Puedes arrastrarlos al lienzo.</p>
    {organization.isPending && <p role="status" className="mt-3 text-xs">Cargando recursos…</p>}
    {organization.isError && <p role="alert" className="mt-3 text-xs">No se pudieron cargar los recursos.</p>}
    {organization.data?.resources.filter(item => !item.archivedAt).map(item => <button key={item.resourceId} type="button" draggable onClick={() => onSelect(item.resourceId)} onDragStart={event => { event.dataTransfer.setData('application/x-theke-resource', item.resourceId); event.dataTransfer.effectAllowed = 'copy'; }} className="mt-2 block w-full cursor-grab rounded border border-border bg-background p-2 text-left text-xs hover:border-primary focus-visible:outline-2" title="Añadir o arrastrar al lienzo">{item.title}</button>)}
    {organization.data?.resources.length === 0 && <p className="mt-3 text-xs text-outline">Aún no hay recursos en el proyecto.</p>}
  </aside>;
}

export function CanvasResourcePicker({ projectId, usedIds, onClose, onSelect, onFocus }: { projectId: string; usedIds: Set<string>; onClose: () => void; onSelect: (id: string) => void; onFocus: (id: string) => void }) {
  const [scope, setScope] = useState<'project' | 'global'>('project'); const [search, setSearch] = useState(''); const [query, setQuery] = useState('');
  useEffect(() => { const timer = setTimeout(() => setQuery(search.trim()), 300); return () => clearTimeout(timer); }, [search]);
  const project = useResources({ projectId, query }, scope === 'project'); const global = useResources({ query }, scope === 'global'); const current = scope === 'project' ? project : global;
  const items = current.data?.pages.flatMap(page => page.data) ?? [];
  return <CanvasDialog titleId="resource-picker-title" onClose={onClose} className="flex max-h-[80vh] max-w-xl flex-col"><div className="flex items-center justify-between"><h2 id="resource-picker-title" className="font-semibold">Añadir recurso al canvas</h2><Button onClick={onClose}>Cerrar</Button></div><label className="mt-4 text-sm">Buscar recurso<input autoFocus className="mt-1 w-full rounded border border-border bg-background p-2" value={search} onChange={event => setSearch(event.target.value)} /></label><div className="mt-3 flex gap-2"><Button variant={scope === 'project' ? 'secondary' : 'ghost'} onClick={() => setScope('project')}>Proyecto</Button><Button variant={scope === 'global' ? 'secondary' : 'ghost'} onClick={() => setScope('global')}>Toda la Biblioteca</Button></div>
    <div className="mt-3 min-h-0 overflow-auto" aria-label="Resultados de recursos">{current.isPending && <p role="status">Buscando…</p>}{current.isError && <p role="alert">No se pudieron cargar los recursos.</p>}{!current.isPending && !current.isError && items.length === 0 && <p className="py-4 text-sm text-outline">No se encontraron recursos.</p>}{items.map(item => <div key={item.id} className="flex items-center gap-2 border-b border-border py-2"><div className="min-w-0 flex-1"><p className="truncate text-sm">{item.title}</p><p className="text-xs text-outline">{item.type === 'note' ? 'Nota' : item.type === 'link' ? 'Enlace' : 'Archivo'}{usedIds.has(item.id) ? ' · Ya representado' : ''}</p></div>{usedIds.has(item.id) ? <><Button onClick={() => onFocus(item.id)}>Ir al uso</Button><Button variant="outline" onClick={() => onSelect(item.id)}>Añadir otra</Button></> : <Button variant="primary" onClick={() => onSelect(item.id)}>Añadir</Button>}</div>)}{current.hasNextPage && <Button className="mt-3" disabled={current.isFetchingNextPage} onClick={() => void current.fetchNextPage()}>Cargar más</Button>}</div></CanvasDialog>;
}
