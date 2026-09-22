import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, thekeFetch } from '../src/api/httpClient';
import { safeDestination } from '../src/features/auth/safeDestination';

afterEach(() => vi.unstubAllGlobals());

describe('acceso privado', () => {
  it('conserva únicamente destinos internos seguros al pedir acceso', () => {
    expect(safeDestination('/canvas/diagram-1?focus=resource')).toBe('/canvas/diagram-1?focus=resource');
    expect(safeDestination('//attacker.test')).toBe('/');
    expect(safeDestination('https://attacker.test')).toBe('/');
  });

  it('restaura identidad desde /v1/me usando solo el token, sin accountId', async () => {
    const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
      expect(init.headers).toEqual({ Authorization: 'Bearer session-token' });
      expect(init.body).toBeUndefined();
      return new Response(JSON.stringify({ data: { user: { id: 'u1', email: null, displayName: 'Daniel' }, account: { id: 'a1', name: 'Mi espacio' }, membership: { id: 'm1', role: 'owner' } } }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);
    await expect(thekeFetch('/v1/me', { headers: { Authorization: 'Bearer session-token' } })).resolves.toMatchObject({ data: { data: { account: { id: 'a1' } } }, status: 200 });
  });

  it('preserva el error uniforme y requestId para una recuperación segura', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ error: { code: 'UNAUTHORIZED', message: 'Sesión vencida', requestId: 'req-401' } }), { status: 401 })));
    await expect(thekeFetch('/v1/me', { headers: { Authorization: 'Bearer expired' } })).rejects.toMatchObject<ApiError>({ status: 401, payload: { error: { code: 'UNAUTHORIZED', message: 'Sesión vencida', requestId: 'req-401' } } });
  });
});
