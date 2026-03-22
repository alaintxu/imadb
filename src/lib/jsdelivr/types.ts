import { LANGS, fetchAndAddLanguageToItems, fetchCdnJson } from '@/lib/jsdelivr/common';

export type Type = {
    code: string;
    name: Record<string, string>; // language code to name mapping
}

export type JsonType = {
    code: string;
    name: string;
}

async function fetchOriginalTypes() {
  const jsonTypes = await fetchCdnJson<JsonType[]>('types.json');

  // Initialize types with English names
  const types: Type[] = jsonTypes.map(type => ({
    ...type,
    name: {
      en: type.name
    }
  }));

  return types;
}

export async function fetchAllTypes() {
  let types: Type[] = await fetchOriginalTypes();

  // Get all translations
  for (const lang of LANGS) {
    types = await fetchAndAddLanguageToItems(lang, types, 'types.json');
  }
  return types;
}

export async function fetchLangTypes(lang: string = 'en') {
  const originalTypes = await fetchOriginalTypes();
  return await fetchAndAddLanguageToItems(lang, originalTypes, 'types.json');
}