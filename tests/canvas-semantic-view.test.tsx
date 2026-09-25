import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CanvasSemanticView } from '../src/features/canvas/CanvasSemanticView';
import { useCanvasStore } from '../src/store/useCanvasStore';

vi.mock('../src/data/useOrganization', () => ({ useOrganization: () => ({ data: { folders: [], resources: [{ resourceId: 'r1', title: 'Documento' }] } }) }));
afterEach(() => cleanup());

describe('vista semántica del canvas', () => {
  it('sincroniza selección y permite mover, agrupar, quitar y deshacer', () => {
    useCanvasStore.setState({ nodes: [
      { id: 'group', type: 'container', position: { x: 0, y: 0 }, data: { label: 'Grupo A' } },
      { id: 'one', type: 'resource', position: { x: 10, y: 10 }, data: { resourceId: 'r1' } },
      { id: 'two', type: 'annotation', position: { x: 30, y: 30 }, data: { kind: 'text', text: 'Idea' }, hidden: true },
    ], edges: [], past: [], future: [], gestureSnapshot: null });
    render(<CanvasSemanticView projectId="p1" />);
    expect(screen.getByRole('list').textContent).toContain('Documento');
    expect(screen.getByRole('list').textContent).toContain('Oculto');
    fireEvent.click(screen.getByRole('button', { name: /Documento — Recurso/ }));
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'one')?.selected).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Mover derecha' }));
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'one')?.position.x).toBe(30);
    fireEvent.change(screen.getByRole('combobox', { name: 'Grupo visual del elemento' }), { target: { value: 'group' } });
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'one')?.parentId).toBe('group');
    fireEvent.click(screen.getByRole('button', { name: 'Quitar representación del diagrama' }));
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'one')).toBeUndefined();
    expect(screen.getByRole('button', { name: /Grupo A — Grupo/ })).toHaveFocus();
    useCanvasStore.getState().undo();
    expect(useCanvasStore.getState().nodes.find(node => node.id === 'one')).toBeDefined();
  });
});
