import { LANGS, fetchAndAddLanguageToItems, fetchCdnJson } from '@/lib/jsdelivr/common';

export type Faction = {
    code: string;
    name: Record<string, string>; // language code to name mapping
}

export type JsonFaction = {
    code: string;
    name: string;
}

async function fetchOriginalFactions() {
  const jsonFactions = await fetchCdnJson<JsonFaction[]>('factions.json');

  // Initialize factions with English names
  const factions: Faction[] = jsonFactions.map(faction => ({
    ...faction,
    name: {
      en: faction.name
    }
  }));

  return factions;
}

export async function fetchAllFactions() {
  let factions: Faction[] = await fetchOriginalFactions();

  // Get all translations
  for (const lang of LANGS) {
    factions = await fetchAndAddLanguageToItems(lang, factions, 'factions.json');
  }
  return factions;
}

export async function fetchLangFactions(lang: string = 'en') {
  const originalFactions = await fetchOriginalFactions();
  return await fetchAndAddLanguageToItems(lang, originalFactions, 'factions.json');
}

