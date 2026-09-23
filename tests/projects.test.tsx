import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Projects } from '../src/pages/Projects';

const state = vi.hoisted(() => ({
  query: { data: { pages: [{ data: [], meta: { nextCursor: null } }] }, isPending: false, isError: false, hasNextPage: false, isFetchingNextPage: false, refetch: vi.fn(), fetchNextPage: vi.fn() },
  create: { mutateAsync: vi.fn(), isPending: false },
}));
vi.mock('../src/data/useProjects', () => ({
  useProjects: () => state.query,
  useProject: () => ({ isPending: false }),
  useProjectActions: () => ({ create: state.create, rename: { mutateAsync: vi.fn(), isPending: false }, archive: { mutate: vi.fn() }, restore: { mutate: vi.fn() } }),
}));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('projects', () => {
  it('explica el estado vacío y permite iniciar la creación', () => {
    render(<MemoryRouter initialEntries={['/projects']}><Projects /></MemoryRouter>);
    expect(screen.getByText('Aún no tienes proyectos')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Crear primer proyecto' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('conserva y señala un nombre inválido', () => {
    render(<MemoryRouter initialEntries={['/projects']}><Projects /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Crear primer proyecto' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(screen.getByRole('alert')).toHaveTextContent('1 y 120');
    expect(input).toHaveValue('   ');
  });
});
