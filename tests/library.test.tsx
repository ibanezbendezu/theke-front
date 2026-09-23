import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Library } from '../src/pages/Library';

vi.mock('../src/data/useNotes', () => ({
  useNotes: () => ({ data: { pages: [{ data: [], meta: { nextCursor: null } }] }, isPending: false, isError: false, hasNextPage: false }),
  useNote: () => ({ isPending: false }),
  useNoteActions: () => ({ create: { mutateAsync: vi.fn(), isPending: false }, update: { mutateAsync: vi.fn(), isPending: false } }),
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
});
