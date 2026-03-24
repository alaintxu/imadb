import { useQuery } from '@tanstack/react-query';
import type { IMA } from '@/lib/imas/imas';
import type { CardSet, CardSetType } from '@/lib/sets/sets';

const QUERY_STALE_TIME = 1000 * 60 * 10;

export type IMAQueryParams = {
  villainCode?: string;
  authorUsername?: string;
  modularSetCodes?: string[];
  tags?: string[];
  original?: boolean;
};

export type SetsQueryParams = {
  setCodes?: string[];
  villainCode?: string;
  type?: CardSetType;
  packCode?: string;
};

function normalizeSetsQueryParams({
  setCodes,
  villainCode,
  type,
  packCode,
}: SetsQueryParams): SetsQueryParams {
  return {
    setCodes: setCodes?.length ? setCodes : undefined,
    villainCode: villainCode || undefined,
    type: type || undefined,
    packCode: packCode || undefined,
  };
}

function normalizeIMAQueryParams({
  villainCode,
  authorUsername,
  modularSetCodes,
  tags,
  original,
}: IMAQueryParams): IMAQueryParams {
  return {
    villainCode: villainCode || undefined,
    authorUsername: authorUsername || undefined,
    modularSetCodes: modularSetCodes?.length ? modularSetCodes : undefined,
    tags: tags?.length ? tags : undefined,
    original,
  };
}

async function fetchJson<T>(url: string, errorMessage: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(errorMessage);
  }

  return (await res.json()) as T;
}

export function useSetQueryByCode(setCode: string) {
  return useQuery<CardSet>({
    queryKey: ['set', setCode],
    queryFn: () => fetchJson<CardSet>(`/api/set/${setCode}`, 'Failed to fetch set'),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useSetsQuery(params: SetsQueryParams) {
  const normalizedParams = normalizeSetsQueryParams(params);
  return useQuery<CardSet[]>({
    queryKey: ['setsByCodes', normalizedParams],
    queryFn: () => fetchJson<CardSet[]>(getSetsQueryUrl(normalizedParams), 'Failed to fetch sets'),
    staleTime: QUERY_STALE_TIME,
  });
}

export function useIMAsQuery(params: IMAQueryParams = {}) {
  const normalizedParams = normalizeIMAQueryParams(params);

  return useQuery<IMA[]>({
    queryKey: ['imas', normalizedParams],
    queryFn: () => fetchJson<IMA[]>(getIMASQueryUrl(normalizedParams), 'Failed to fetch IMAs'),
    staleTime: QUERY_STALE_TIME,
  });
}

function getIMASQueryUrl({
  villainCode,
  authorUsername,
  modularSetCodes,
  tags,
  original,
}: IMAQueryParams) {
  const searchParams = new URLSearchParams();

  if (villainCode) {
    searchParams.set('villain', villainCode);
  }

  if (authorUsername) {
    searchParams.set('author', authorUsername);
  }

  modularSetCodes?.forEach((code) => {
    searchParams.append('modularSet', code);
  });

  tags?.forEach((tag) => {
    searchParams.append('tag', tag);
  });

  if (original !== undefined) {
    searchParams.set('original', String(original));
  }

  const queryString = searchParams.toString();
  return queryString ? `/api/imas?${queryString}` : '/api/imas';
}

function getSetsQueryUrl({
  setCodes,
  villainCode,
  type,
  packCode,
}: SetsQueryParams) {
  const searchParams = new URLSearchParams();

  setCodes?.forEach((code) => {
    searchParams.append('setCode', code);
  });

  if (villainCode) {
    searchParams.set('villain', villainCode);
  }

  if (type) {
    searchParams.set('type', type);
  }

  if (packCode) {
    searchParams.set('pack', packCode);
  }

  const queryString = searchParams.toString();
  return queryString ? `/api/sets?${queryString}` : '/api/sets';
}