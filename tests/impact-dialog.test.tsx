import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImpactDialog } from '../src/components/ui/ImpactDialog';

const execute = vi.hoisted(() => vi.fn().mockResolvedValue({}));
vi.mock('../src/data/useImpacts', () => ({
  useImpact: () => ({ data: { entityType: 'resource', entityId: 'resource-1', entityName: 'Fuente', action: 'delete', state: 'active', affected: { projects: 2, folders: 1, resources: 1, placements: 2 }, locations: ['Proyecto A / Fuentes'], consequences: ['Sus referencias dejarían de funcionar.'], recommendedAction: 'archive', deletionAllowed: false, confirmationPhrase: 'ELIMINAR Fuente', impactVersion: 'v1' }, isPending: false, isError: false, refetch: vi.fn() }),
  useImpactActions: () => ({ execute: { mutateAsync: execute, isPending: false } }),
}));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

function Harness() { const [open, setOpen] = useState(false); return <><button onClick={() => setOpen(true)}>Abrir impacto</button>{open && <ImpactDialog request={{ entityType: 'resource', id: 'resource-1', action: 'delete' }} onClose={() => setOpen(false)} onDone={() => setOpen(false)}/>}</>; }
describe('diálogo de impacto', () => {
  it('explica usos, bloquea la eliminación y restaura el foco al cerrar', () => {
    render(<Harness/>); const trigger = screen.getByRole('button', { name: 'Abrir impacto' }); trigger.focus(); fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toHaveTextContent('2 proyecto(s)'); expect(screen.getByText('Proyecto A / Fuentes')).toBeInTheDocument(); expect(screen.getByText('La eliminación está bloqueada.')).toBeInTheDocument(); expect(screen.queryByRole('button', { name: 'Eliminar' })).not.toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' }); expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(trigger).toHaveFocus();
  });
});
