import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Library } from '../src/pages/Library';

vi.mock('../src/data/useNotes', () => ({
  useNotes: () => ({ data: { pages: [{ data: [], meta: { nextCursor: null } }] }, isPending: false, isError: false, hasNextPage: false }),
  useNote: () => ({ isPending: false }),
  useNoteActions: () => ({ create: { mutateAsync: vi.fn(), isPending: false }, update: { mutateAsync: vi.fn(), isPending: false } }),
}));
vi.mock('../src/data/useUploads', () => ({
  useUploads: () => ({ uploads: {}, policy: { data: { maxBatchSize: 20, maxFileSize: 262144000, allowedMediaTypes: ['text/plain'] } }, create: vi.fn(() => new Promise(() => undefined)), finalize: vi.fn(), cancel: vi.fn() }),
}));
afterEach(cleanup);
describe('library notes', () => {
  it('explica el estado vacío y conserva la validación local', () => {
    render(<MemoryRouter initialEntries={['/library']}><Library /></MemoryRouter>);
    expect(screen.getByText('Tu Biblioteca está vacía')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Crear una nota' }));
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(screen.getByRole('status')).toHaveTextContent('título es obligatorio');
  });
  it('muestra cada archivo seleccionado con progreso y cancelación', () => {
    render(<MemoryRouter initialEntries={['/library']}><Library /></MemoryRouter>);
    const file = new File(['contenido'], 'fuente.txt', { type: 'text/plain' });
    fireEvent.change(screen.getByLabelText('Seleccionar archivos'), { target: { files: [file] } });
    expect(screen.getByText('fuente.txt')).toBeInTheDocument();
    expect(screen.getByLabelText('Progreso de fuente.txt')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar fuente.txt' })).toBeInTheDocument();
  });
});
