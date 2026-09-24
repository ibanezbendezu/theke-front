import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { FileText, Link as LinkIcon, Paperclip } from 'lucide-react';
import { useResource } from '../../../data/useResources';

export type ResourceNodeType = Node<{ resourceId: string }, 'resource'>;
export function ResourceNode({ data, selected }: NodeProps<ResourceNodeType>) {
  const resource = useResource(data.resourceId);
  const Icon = resource.data?.type === 'note' ? FileText : resource.data?.type === 'link' ? LinkIcon : Paperclip;
  return <article className={`flex w-72 items-center gap-3 rounded-lg border bg-background p-3 shadow-sm ${selected ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
    <Icon size={20} className="shrink-0 text-primary" aria-hidden="true" />
    <div className="min-w-0"><p className="truncate text-sm font-medium">{resource.data?.title ?? (resource.isError ? 'Recurso no disponible' : 'Cargando recurso…')}</p><p className="text-xs text-outline">{resource.data?.type === 'note' ? 'Nota' : resource.data?.type === 'link' ? 'Enlace' : 'Archivo'}</p></div>
    <Handle type="target" position={Position.Left} className="bg-primary"/><Handle type="source" position={Position.Right} className="bg-primary"/>
  </article>;
}
