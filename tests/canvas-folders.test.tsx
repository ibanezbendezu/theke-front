import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CanvasFolderInspector } from '../src/features/canvas/CanvasFolderInspector';
import { useCanvasStore } from '../src/store/useCanvasStore';

vi.mock('../src/data/useOrganization', () => ({ useOrganization: () => ({ data: { folders: [{ id: 'folder-1', name: 'Fuentes', archivedAt: null }], resources: [{ folderId: 'folder-1', archivedAt: null }] }, isPending: false, isError: false }) }));
vi.mock('../src/data/useResources', () => ({ useResources: () => ({ data: { pages: [{ data: [{ id: 'resource-1', title: 'Documento' }] }] }, isPending: false, isError: false, hasNextPage: false }) }));
afterEach(() => cleanup());

describe('carpetas en el canvas', () => {
  it('añade solo la tarjeta y permite elegir un recurso individual', () => {
    useCanvasStore.setState({ nodes: [], edges: [] });
    const nodeId = useCanvasStore.getState().addFolderRepresentation('folder-1', 'project-1', { x: 10, y: 20 });
    expect(useCanvasStore.getState().nodes).toHaveLength(1);
    expect(useCanvasStore.getState().nodes[0].data).toEqual({ folderId: 'folder-1', projectId: 'project-1' });
    const add = vi.fn();
    render(<CanvasFolderInspector nodeId={nodeId} projectId="project-1" folderId="folder-1" onAddResource={add} />);
    expect(screen.getByRole('region', { name: 'Datos de la carpeta' })).toHaveTextContent('Fuentes');
    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));
    expect(add).toHaveBeenCalledWith('resource-1');
    expect(useCanvasStore.getState().nodes).toHaveLength(1);
  });
});
