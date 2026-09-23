import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCurrentAccount } from '../src/data/useCurrentAccount';

const auth = vi.hoisted(() => ({ getToken: vi.fn(async () => 'session-token'), userId: 'clerk-user-1' }));
vi.mock('@clerk/clerk-react', () => ({ useAuth: () => auth }));

function AccountProbe() {
  const account = useCurrentAccount();
  return <p>{account.data?.account.name ?? 'Cargando'}</p>;
}

describe('restauración de cuenta', () => {
  beforeEach(() => vi.stubEnv('VITE_API_URL', 'https://api.test/'));
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.clearAllMocks(); });

  it('envía el token Clerk a GET /v1/me y desbloquea los datos con QueryClient', async () => {
    const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
      expect(_url).toBe('https://api.test/v1/me');
      expect(init.method).toBe('GET');
      expect(init.headers).toEqual({ Authorization: 'Bearer session-token' });
      expect(init.signal).toBeInstanceOf(AbortSignal);
      return new Response(JSON.stringify({ data: { user: { id: 'u1', email: null, displayName: 'Daniel' }, account: { id: 'a1', name: 'Espacio de Daniel' }, membership: { id: 'm1', role: 'owner' } } }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(<QueryClientProvider client={client}><AccountProbe /></QueryClientProvider>);
    await waitFor(() => expect(screen.getByText('Espacio de Daniel')).toBeInTheDocument());
    expect(auth.getToken).toHaveBeenCalledOnce();
    expect(client.getQueryData(['private', 'me', 'clerk-user-1'])).toMatchObject({ account: { id: 'a1' } });
  });
});
