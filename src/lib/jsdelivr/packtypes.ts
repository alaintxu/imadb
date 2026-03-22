import { LANGS, fetchAndAddLanguageToItems, fetchCdnJson } from '@/lib/jsdelivr/common';


export type PackType = {
    code: string;
    name: Record<string, string>;
}

export type JsonPackType = {
    code: string;
    name: string;
}

async function fetchOriginalPackTypes() {
  const jsonPackTypes = await fetchCdnJson<JsonPackType[]>('packtypes.json');

  // Initialize pack types with English names
  const packTypes: PackType[] = jsonPackTypes.map(packType => ({
    ...packType,
    name: {
      en: packType.name
    }
  }));

  return packTypes;
}

export async function fetchAllPackTypes() {
  let packTypes: PackType[] = await fetchOriginalPackTypes();

  // Get all translations
  for (const lang of LANGS) {
    packTypes = await fetchAndAddLanguageToItems(lang, packTypes, 'packtypes.json');
  }
  return packTypes;
}

export async function fetchLangPackTypes(lang: string = 'en') {
  const originalPackTypes = await fetchOriginalPackTypes();
  return await fetchAndAddLanguageToItems(lang, originalPackTypes, 'packtypes.json');
}