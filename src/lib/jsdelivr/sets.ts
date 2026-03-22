import type { CardSet, CardSetType } from '@/lib/sets/sets';
import { LANGS, fetchAndAddLanguageToItems, fetchCdnJson } from '@/lib/jsdelivr/common';

export type JsonCardSet = {
  code: string;
  name: string;
  card_set_type_code: CardSetType;
}

async function fetchOriginalSets() {
  const jsonSets = await fetchCdnJson<JsonCardSet[]>('sets.json');

  // Initialize sets with English names
  const sets: CardSet[] = jsonSets.map(set => ({
    ...set,
    set_type: set.card_set_type_code,
    name: {
      en: set.name
    }
  }));

  return sets;
}

export async function fetchAllSets() {
  let sets: CardSet[] = await fetchOriginalSets();

  // Get all translations
  for (const lang of LANGS) {
    sets = await fetchAndAddLanguageToItems(lang, sets, 'sets.json');
  }
  return sets;
}

export async function fetchLangSets(lang: string = 'en') {
  const originalSets = await fetchOriginalSets();
  return await fetchAndAddLanguageToItems(lang, originalSets, 'sets.json');
}