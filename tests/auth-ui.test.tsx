import { QueryClient } from '@tanstack/react-query';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../src/features/auth/PrivateRoute';
import { AccessPage } from '../src/features/auth/AccessPage';
import { RegisterPage } from '../src/features/auth/RegisterPage';
import { clearPrivateCache, registerPrivateQueryClient } from '../src/data/queryClient';

const state = vi.hoisted(() => ({ auth: { isLoaded: false, isSignedIn: false }, account: { isPending: false, isError: false, data: undefined as unknown, refetch: vi.fn() } }));
vi.mock('@clerk/clerk-react', () => ({ useAuth: () => state.auth, SignIn: () => <button>Continuar con Clerk</button>, SignUp: () => <button>Crear cuenta con Clerk</button> }));
vi.mock('../src/data/useCurrentAccount', () => ({ useCurrentAccount: () => state.account }));
afterEach(() => { cleanup(); state.auth = { isLoaded: false, isSignedIn: false }; state.account = { isPending: false, isError: false, data: undefined, refetch: vi.fn() }; });

describe('estados de autenticación', () => {
  it('no muestra datos privados mientras Clerk resuelve la sesión', () => {
    render(<MemoryRouter><PrivateRoute><p>Dato privado</p></PrivateRoute></MemoryRouter>);
    expect(screen.getByText('Restaurando tu espacio…')).toBeInTheDocument(); expect(screen.queryByText('Dato privado')).not.toBeInTheDocument();
  });
  it('muestra recuperación con reintento cuando /v1/me falla', () => {
    state.auth = { isLoaded: true, isSignedIn: true }; state.account.isError = true;
    render(<MemoryRouter><PrivateRoute><p>Dato privado</p></PrivateRoute></MemoryRouter>);
    expect(screen.getByRole('alert')).toHaveTextContent('Tu trabajo sigue protegido'); expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });
  it('monta el espacio privado solo después de restaurar Clerk y /v1/me', () => {
    state.auth = { isLoaded: true, isSignedIn: true }; state.account.data = { account: { id: 'a1' } };
    render(<MemoryRouter><PrivateRoute><p>Dato privado</p></PrivateRoute></MemoryRouter>);
    expect(screen.getByText('Dato privado')).toBeInTheDocument();
  });
  it('ofrece OTP o Google sin enumerar cuentas y permite reintentar/cancelar dentro de Clerk', () => {
    state.auth = { isLoaded: true, isSignedIn: false };
    render(<MemoryRouter initialEntries={['/access']}><AccessPage /></MemoryRouter>);
    expect(screen.getByText(/Google o recibe un código/)).toBeInTheDocument(); expect(screen.getByRole('button', { name: 'Continuar con Clerk' })).toBeInTheDocument();
  });
  it('ofrece un alta Clerk separada y conserva el destino seguro', () => {
    state.auth = { isLoaded: true, isSignedIn: false };
    render(<MemoryRouter initialEntries={['/register?returnTo=%2Flibrary']}><RegisterPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Crea tu espacio Theke' })).toBeInTheDocument(); expect(screen.getByRole('button', { name: 'Crear cuenta con Clerk' })).toBeInTheDocument();
  });
  it('limpia toda la caché privada al cerrar sesión', () => {
    const client = new QueryClient(); client.setQueryData(['private', 'me'], { secret: true }); registerPrivateQueryClient(client); clearPrivateCache();
    expect(client.getQueryCache().getAll()).toHaveLength(0);
  });
});
