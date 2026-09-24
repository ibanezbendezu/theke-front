import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Projects } from '../src/pages/Projects';

const state = vi.hoisted(() => ({
  createFolder: vi.fn(),
  addResources: vi.fn(),
  createDiagram: vi.fn(),
}));

vi.mock('../src/data/useProjects', () => ({
  useProjects: () => ({ data: { pages: [] }, isPending: false, isError: false }),
  useProject: () => ({ data: { id: 'project-1', name: 'Investigación', updatedAt: new Date().toISOString() }, isPending: false, isError: false }),
  useProjectActions: () => ({ create: { mutateAsync: vi.fn(), isPending: false }, rename: { mutateAsync: vi.fn(), isPending: false }, archive: { mutate: vi.fn() }, restore: { mutate: vi.fn() } }),
}));
vi.mock('../src/data/useOrganization', () => ({
  useOrganization: () => ({ data: { folders: [], resources: [] }, isPending: false, isError: false }),
  useOrganizationActions: () => ({
    createFolder: { mutateAsync: state.createFolder }, renameFolder: { mutate: vi.fn() }, archiveFolder: { mutate: vi.fn() }, restoreFolder: { mutate: vi.fn() },
    addResources: { mutate: state.addResources }, moveResources: { mutate: vi.fn() },
  }),
}));
vi.mock('../src/data/useNotes', () => ({
  useNotes: () => ({ data: { pages: [{ data: [{ id: 'note-1', title: 'Fuente útil' }] }] } }),
}));
vi.mock('../src/data/useDiagrams', () => ({
  useDiagrams: () => ({ data: [], isPending: false, isError: false }),
  useDiagramActions: () => ({ create: { mutateAsync: state.createDiagram, isPending: false }, rename: { mutate: vi.fn() }, duplicate: { mutate: vi.fn() }, restore: { mutate: vi.fn() } }),
}));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('organización de un proyecto', () => {
  it('crea carpetas y permite añadir recursos de la Biblioteca', async () => {
    state.createFolder.mockResolvedValue(undefined);
    render(<MemoryRouter initialEntries={['/projects/project-1']}><Projects /></MemoryRouter>);

    fireEvent.change(screen.getByRole('textbox', { name: 'Nombre de carpeta' }), { target: { value: 'Fuentes' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear carpeta' }));
    expect(state.createFolder).toHaveBeenCalledWith('Fuentes');

    fireEvent.click(screen.getByRole('button', { name: 'Añadir desde Biblioteca' }));
    expect(screen.getByText('Fuente útil')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));
    expect(state.addResources).toHaveBeenCalledWith(['note-1']);
  });
  it('explica el lienzo vacío y crea un diagrama asociado', async () => {
    state.createDiagram.mockResolvedValue({ id: 'diagram-1' });
    render(<MemoryRouter initialEntries={['/projects/project-1']}><Projects /></MemoryRouter>);
    expect(screen.getByText('Aún no hay diagramas')).toBeInTheDocument();
    expect(screen.getByText(/nodos, grupos y enlaces/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Nombre del diagrama' }), { target: { value: 'Mapa de ideas' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear diagrama' }));
    expect(state.createDiagram).toHaveBeenCalledWith('Mapa de ideas');
  });
});
