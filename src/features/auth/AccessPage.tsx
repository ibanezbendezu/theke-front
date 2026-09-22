import { SignIn, useAuth } from '@clerk/clerk-react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { safeDestination } from './safeDestination';

export function AccessPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [params] = useSearchParams();
  const destination = safeDestination(params.get('returnTo'));
  if (isLoaded && isSignedIn) return <Navigate replace to={destination} />;
  return <main className="grid min-h-screen place-items-center bg-surface p-4"><section aria-labelledby="access-title" className="w-full max-w-md"><h1 id="access-title" className="mb-2 text-center text-2xl font-semibold">Accede a Theke</h1><p className="mb-6 text-center text-outline">Continúa con Google o recibe un código de un solo uso por correo.</p><SignIn routing="hash" signUpUrl={`/register?returnTo=${encodeURIComponent(destination)}`} forceRedirectUrl={destination} appearance={{ elements: { rootBox: 'mx-auto', cardBox: 'shadow-none' } }} /></section></main>;
}
