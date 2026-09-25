import { Button } from '../../components/ui/Button';
import { useRelation } from '../../data/useRelations';
import { useCanvasStore } from '../../store/useCanvasStore';

const evidenceLabel = { none: 'Sin evidencia citada', needs_evidence: 'Falta evidencia', confirmed: 'Evidencia citada' };

export function CanvasRelationInspector({ relationId, sourceNodeId, targetNodeId }: { relationId: string; sourceNodeId: string; targetNodeId: string }) {
  const relation = useRelation(relationId);
  const focusNode = useCanvasStore(state => state.focusNode);
  const requestEdit = useCanvasStore(state => state.requestEditRelation);
  const detail = relation.data;
  return <div className="space-y-4 text-sm">
    <h2 className="font-semibold">Detalle de la Relación</h2>
    {relation.isPending && <p role="status">Cargando Relación…</p>}
    {relation.isError && <div role="alert"><p>No se pudo cargar la Relación.</p><Button className="mt-2" onClick={() => void relation.refetch()}>Reintentar</Button></div>}
    {detail && <>
      <section aria-label="Relación canónica" className="space-y-2 rounded border border-border p-3">
        <h3 className="font-medium">En la Cuenta</h3>
        <p className="font-medium">{detail.label || detail.typeLabel}</p>
        <p>{detail.source.title} {detail.direction === 'directed' ? '→' : '↔'} {detail.target.title}</p>
        <p className="text-xs text-outline">{detail.typeLabel} · {detail.direction === 'directed' ? 'Dirigida' : 'No dirigida'} · {evidenceLabel[detail.evidenceStatus]}</p>
        <div className="flex flex-wrap gap-2"><Button onClick={() => focusNode(sourceNodeId)}>Ir al origen</Button><Button onClick={() => focusNode(targetNodeId)}>Ir al destino</Button></div>
        {detail.explanation && <div><h4 className="font-medium">Explicación</h4><p className="whitespace-pre-wrap">{detail.explanation}</p></div>}
        {detail.provenance && <div><h4 className="font-medium">Procedencia</h4><p className="whitespace-pre-wrap">{detail.provenance}</p></div>}
        {detail.evidenceStatus === 'needs_evidence' && <p className="rounded border border-amber-500 p-2 text-amber-700">Necesita respaldo adicional.</p>}
        <div><h4 className="font-medium">Evidencia</h4>{detail.evidence.length ? <ul className="space-y-2">{detail.evidence.map(item => <li key={item.id} className="rounded border border-border p-2"><a className="text-primary underline" href={`/library/${encodeURIComponent(item.resourceId)}`} target="_blank" rel="noopener noreferrer">{item.title}</a>{item.excerpt && <p className="mt-1 whitespace-pre-wrap">“{item.excerpt}”</p>}{item.note && <p className="mt-1 whitespace-pre-wrap text-outline">{item.note}</p>}</li>)}</ul> : <p className="text-outline">Sin citas.</p>}</div>
        <Button variant="primary" onClick={() => requestEdit(relationId)}>Editar Relación</Button>
      </section>
      <section aria-label="Presentación local" className="rounded border border-border p-3"><h3 className="font-medium">Solo en este Diagrama</h3><p className="mt-1 text-xs text-outline">La posición, el trazo y la visibilidad de esta línea no cambian la Relación canónica.</p></section>
    </>}
  </div>;
}
