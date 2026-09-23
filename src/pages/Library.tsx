import { useState } from 'react';
import type { FormEvent } from 'react';
import { FileText } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ViewToolbar } from '../components/ui/ViewToolbar';
import { type Note, type NoteInput, useNote, useNoteActions, useNotes } from '../data/useNotes';

export function Library() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate(); const location = useLocation();
  const noteId = location.pathname.match(/^\/library\/([^/]+)$/)?.[1];
  const notes = useNotes(); const detail = useNote(noteId); const actions = useNoteActions();
  const items = notes.data?.pages.flatMap(page => page.data) ?? [];

  if (noteId) return <main className="w-full px-6 md:px-8 py-6"><Button onClick={() => navigate('/library')}>← Biblioteca</Button>{detail.isPending && <p role="status" className="mt-5">Cargando nota…</p>}{detail.isError && <p role="alert" className="mt-5 text-red-600">No se pudo abrir la nota.</p>}{detail.data && <NoteEditor note={detail.data} busy={actions.update.isPending} onCancel={() => navigate('/library')} onSave={async body => { const saved = await actions.update.mutateAsync({ id: detail.data.id, body }); return saved.contentUnchanged; }} />}</main>;

  return <main className="w-full px-6 md:px-8 py-6 pb-32" aria-labelledby="library-title">
    <div className="flex items-center justify-between"><div><h1 id="library-title" className="text-xl font-semibold">Biblioteca</h1><p className="text-sm text-outline">Recursos reutilizables en distintos proyectos y diagramas.</p></div><ViewToolbar viewMode={viewMode} setViewMode={setViewMode} onNew={() => setCreating(true)} /></div>
    {notes.isPending && <p role="status" className="mt-6">Cargando Biblioteca…</p>}
    {notes.isError && <div role="alert" className="mt-6"><p className="text-red-600">No se pudo cargar la Biblioteca.</p><Button variant="outline" onClick={() => notes.refetch()}>Reintentar</Button></div>}
    {!notes.isPending && !notes.isError && items.length === 0 && <section className="mt-8 rounded-lg border border-dashed border-border p-10 text-center"><FileText className="mx-auto text-outline" size={36}/><h2 className="mt-3 font-medium">Tu Biblioteca está vacía</h2><p className="mt-1 text-sm text-outline">Crea una nota y reutilízala después en distintos contextos.</p><Button className="mt-4" variant="primary" onClick={() => setCreating(true)}>Crear una nota</Button></section>}
    {items.length > 0 && (viewMode === 'grid' ? <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">{items.map(note => <Card key={note.id} title={note.title} subtitle={note.description || 'Nota'} icon={<FileText size={32}/>} onClick={() => navigate(`/library/${note.id}`)} />)}</div> : <div className="mt-6 divide-y divide-border border-y border-border">{items.map(note => <button key={note.id} className="flex w-full items-center gap-3 py-3 text-left hover:bg-surface-variant" onClick={() => navigate(`/library/${note.id}`)}><FileText size={18}/><span className="flex-1"><strong className="block font-medium">{note.title}</strong><small className="text-outline">{note.description || 'Sin descripción'}</small></span><time className="text-xs text-outline">{new Date(note.updatedAt).toLocaleDateString()}</time></button>)}</div>)}
    {notes.hasNextPage && <Button className="mt-5" variant="outline" onClick={() => notes.fetchNextPage()}>Cargar más</Button>}
    {creating && <div className="fixed inset-0 z-50 overflow-auto bg-background p-6"><NoteEditor busy={actions.create.isPending} onCancel={() => setCreating(false)} onSave={async body => { const saved = await actions.create.mutateAsync(body); setCreating(false); navigate(`/library/${saved.id}`); return false; }} /></div>}
  </main>;
}

function NoteEditor({ note, busy, onCancel, onSave }: { note?: Note; busy: boolean; onCancel: () => void; onSave: (input: NoteInput) => Promise<boolean | undefined> }) {
  const [title, setTitle] = useState(note?.title ?? ''); const [description, setDescription] = useState(note?.description ?? ''); const [content, setContent] = useState(note?.currentVersion.content ?? ''); const [message, setMessage] = useState('');
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!title.trim()) { setMessage('El título es obligatorio.'); return; } try { const unchanged = await onSave({ title, description, content }); setMessage(unchanged ? 'El contenido ya estaba actualizado.' : 'Nota guardada.'); } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo guardar. Puedes reintentar.'); } };
  return <form className="mx-auto mt-4 max-w-3xl" onSubmit={submit}><label className="block text-sm font-medium">Título<input className="mt-1 w-full rounded border border-border bg-background p-2 text-xl" value={title} maxLength={160} onChange={event => setTitle(event.target.value)} /></label><label className="mt-4 block text-sm font-medium">Descripción<input className="mt-1 w-full rounded border border-border bg-background p-2" value={description} onChange={event => setDescription(event.target.value)} /></label><label className="mt-4 block text-sm font-medium">Contenido<textarea className="mt-1 min-h-80 w-full rounded border border-border bg-background p-3" value={content} onChange={event => setContent(event.target.value)} /></label>{message && <p role="status" className="mt-3 text-sm">{message}</p>}<div className="mt-5 flex gap-2"><Button type="button" onClick={onCancel}>Cancelar</Button><Button type="submit" variant="primary" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</Button></div></form>;
}
