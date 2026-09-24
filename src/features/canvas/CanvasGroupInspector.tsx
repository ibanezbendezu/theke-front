import { Button } from '../../components/ui/Button';
import { useCanvasStore } from '../../store/useCanvasStore';

export function CanvasGroupInspector({ groupId }: { groupId: string }) {
  const nodes = useCanvasStore(state => state.nodes);
  const updateNodeData = useCanvasStore(state => state.updateNodeData);
  const moveNodeToGroup = useCanvasStore(state => state.moveNodeToGroup);
  const ungroupNode = useCanvasStore(state => state.ungroupNode);
  const group = nodes.find(node => node.id === groupId);
  if (!group) return null;
  const members = nodes.filter(node => node.parentId === groupId);
  const available = nodes.filter(node => !node.parentId && node.id !== groupId && node.type !== 'container');
  const name = (node: typeof nodes[number]) => typeof node.data.caption === 'string' && node.data.caption ? node.data.caption : typeof node.data.label === 'string' ? node.data.label : `${node.type ?? 'Elemento'} ${node.id.slice(0, 8)}`;
  return <div className="space-y-4 text-sm"><h2 className="font-semibold">Grupo visual</h2><p className="text-xs text-outline">Solo organiza representaciones en este diagrama; no crea una Carpeta ni una Relación.</p>
    <label className="block">Nombre<input className="mt-1 w-full rounded border border-border bg-background p-2" value={typeof group.data.label === 'string' ? group.data.label : ''} maxLength={120} onChange={event => updateNodeData(groupId, { label: event.target.value })}/></label>
    <section aria-label="Miembros del grupo"><h3 className="font-medium">Miembros ({members.length})</h3>{members.map(node => <div key={node.id} className="mt-2 flex items-center gap-2"><span className="min-w-0 flex-1 truncate">{name(node)}</span><Button onClick={() => moveNodeToGroup(node.id)}>Quitar</Button></div>)}</section>
    {available.length > 0 && <section aria-label="Añadir al grupo"><h3 className="font-medium">Añadir elemento</h3>{available.map(node => <div key={node.id} className="mt-2 flex items-center gap-2"><span className="min-w-0 flex-1 truncate">{name(node)}</span><Button onClick={() => moveNodeToGroup(node.id, groupId)}>Añadir</Button></div>)}</section>}
    <Button variant="outline" onClick={() => ungroupNode(groupId)}>Desagrupar sin mover elementos</Button>
  </div>;
}
