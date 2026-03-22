import { LANGS, fetchAndAddLanguageToItems, fetchCdnJson } from '@/lib/jsdelivr/common';
import type { LocalizedFields } from '@/lib/jsdelivr/common';


type JsonPack = {
    code: string;
    cgdb_id: number;
    date_release: string;
    name: string;
    octgn_id: string;
    pack_type_code: string;
    position: number;
    size: number;
}

export type Pack = LocalizedFields<JsonPack, 'name'>;


async function fetchOriginalPacks() {
  const jsonPacks = await fetchCdnJson<JsonPack[]>('packs.json');

  // Initialize packs with English names
  const packs: Pack[] = jsonPacks.map(pack => ({
    ...pack,
    name: {
      en: pack.name
    }
  }));

  return packs;
}

export async function fetchAllPacks() {
  let packs: Pack[] = await fetchOriginalPacks();

  // Get all translations
  for (const lang of LANGS) {
    packs = await fetchAndAddLanguageToItems(lang, packs, 'packs.json');
  }
  return packs;
}

export async function fetchLangPacks(lang: string = 'en') {
  const originalPacks = await fetchOriginalPacks();
  return await fetchAndAddLanguageToItems(lang, originalPacks, 'packs.json');
}