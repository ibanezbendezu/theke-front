import { useAuth } from '@clerk/clerk-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getMe } from '../api/generated/theke';
import { registerPrivateQueryClient } from './queryClient';

export const currentAccountKey = ['private', 'me'] as const;
export function useCurrentAccount() {
  const { getToken, userId } = useAuth();
  const client = useQueryClient();
  useEffect(() => registerPrivateQueryClient(client), [client]);
  return useQuery({
    queryKey: [...currentAccountKey, userId], enabled: Boolean(userId),
    queryFn: async ({ signal }) => {
      const token = await getToken();
      if (!token) throw new Error('La sesión ya no es válida.');
      const response = await getMe({ headers: { Authorization: `Bearer ${token}` }, signal });
      if (response.status !== 200) throw new Error('La API rechazó la sesión.');
      return response.data.data;
    },
  });
}
