import { useAuth } from '@clerk/clerk-react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentAccount } from '../../data/useCurrentAccount';

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const account = useCurrentAccount();
  if (!isLoaded || (isSignedIn && account.isPending)) return <main className="grid min-h-screen place-items-center bg-background" aria-busy="true"><p aria-live="polite">Restaurando tu espacio…</p></main>;
  if (!isSignedIn) return <Navigate replace to={`/access?returnTo=${encodeURIComponent(`${location.pathname}${location.search}`)}`} />;
  if (account.isError) return <main className="grid min-h-screen place-items-center p-6"><div role="alert" className="max-w-md"><h1 className="text-xl font-semibold">No se pudo abrir tu espacio</h1><p className="mt-2">Tu trabajo sigue protegido. Revisa la conexión y vuelve a intentarlo.</p><button className="mt-4 rounded bg-primary px-4 py-2 text-on-primary" onClick={() => account.refetch()}>Reintentar</button></div></main>;
  return children;
}
