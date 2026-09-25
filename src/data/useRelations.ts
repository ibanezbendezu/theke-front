import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import type { DiagramDocument } from './useDiagrams';
import { thekeFetch } from '../api/httpClient';

export interface RelationTypeOption { key: string; label: string }
export interface CreatedRelation { relationId: string; edgeId: string; revision: number; document: DiagramDocument; reused: boolean }
export interface CreateRelationInput { sourceNodeId: string; targetNodeId: string; direction: 'directed' | 'undirected'; typeKey: string; customTypeName?: string; expectedRevision: number; idempotencyKey: string; reuseExisting?: boolean }
interface Envelope<T> { data: T }

export function useRelationTypes(projectId: string) {
  const { getToken, userId } = useAuth();
  return useQuery({ queryKey: ['private', 'relation-types', userId, projectId], enabled: Boolean(userId && projectId), queryFn: async ({ signal }) => {
    const response = await thekeFetch<{ data: Envelope<RelationTypeOption[]> }>(`/v1/projects/${projectId}/relation-types`, { headers: { Authorization: `Bearer ${await getToken()}` }, signal });
    return response.data.data;
  } });
}

export function useCreateRelation(diagramId: string) {
  const { getToken } = useAuth();
  return async (input: CreateRelationInput) => {
    const response = await thekeFetch<{ data: Envelope<CreatedRelation> }>(`/v1/diagrams/${diagramId}/relations`, { method: 'POST', headers: { Authorization: `Bearer ${await getToken()}`, 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    return response.data.data;
  };
}
