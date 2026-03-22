import { useQuery } from '@tanstack/react-query';
import type { CardSet, CardSetType } from '@/lib/sets/sets';

export function useSetsQuery(setType?: CardSetType | '') {
  return useQuery<CardSet[]>({
    queryKey: ['sets', setType ?? 'all'],
    queryFn: async () => {
      const url = setType ? `/api/sets/${setType}` : '/api/sets';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch sets');
      return (await res.json()) as CardSet[];
    },
    staleTime: 1000 * 60 * 10,
  });
}