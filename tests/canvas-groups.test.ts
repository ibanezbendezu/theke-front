import { describe, expect, it } from 'vitest';
import { useCanvasStore } from '../src/store/useCanvasStore';

describe('grupos visuales', () => {
  it('conserva posiciones absolutas al agrupar, añadir, quitar y desagrupar', () => {
    useCanvasStore.setState({ nodes: [
      { id: 'one', type: 'resource', position: { x: 100, y: 200 }, data: { resourceId: 'resource-1' }, selected: true },
      { id: 'two', type: 'folder', position: { x: 450, y: 200 }, data: { folderId: 'folder-1', projectId: 'project-1' }, selected: true },
      { id: 'three', type: 'resource', position: { x: 800, y: 300 }, data: { resourceId: 'resource-2' } },
    ], edges: [] });
    const store = useCanvasStore.getState(); const groupId = store.groupNodes(['one', 'two']); expect(groupId).toBeTruthy();
    const grouped = useCanvasStore.getState().nodes; const group = grouped.find(node => node.id === groupId)!;
    expect(grouped.findIndex(node => node.id === groupId)).toBeLessThan(grouped.findIndex(node => node.id === 'one'));
    expect(grouped.find(node => node.id === 'one')!.position.x + group.position.x).toBe(100);
    expect(grouped.find(node => node.id === 'two')!.position.x + group.position.x).toBe(450);
    store.moveNodeToGroup('three', groupId!);
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'three')!.position.x + group.position.x).toBe(800);
    store.moveNodeToGroup('three'); expect(useCanvasStore.getState().nodes.find(node => node.id === 'three')!.position.x).toBe(800);
    store.ungroupNode(groupId!);
    expect(useCanvasStore.getState().nodes.map(node => node.id).sort()).toEqual(['one', 'three', 'two']);
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'one')!.position).toEqual({ x: 100, y: 200 });
  });
});
