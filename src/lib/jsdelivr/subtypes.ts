import { LANGS, fetchAndAddLanguageToItems, fetchCdnJson } from '@/lib/jsdelivr/common';

export type SubType = {
    code: string;
    name: Record<string, string>; // language code to name mapping
}

export type JsonSubType = {
    code: string;
    name: string;
}

async function fetchOriginalSubTypes() {
  const jsonSubTypes = await fetchCdnJson<JsonSubType[]>('subtypes.json');

  // Initialize subtypes with English names
  const subTypes: SubType[] = jsonSubTypes.map(subType => ({
    ...subType,
    name: {
      en: subType.name
    }
  }));

  return subTypes;
}

export async function fetchAllSubTypes() {
  let subTypes: SubType[] = await fetchOriginalSubTypes();

  // Get all translations
  for (const lang of LANGS) {
    subTypes = await fetchAndAddLanguageToItems(lang, subTypes, 'subtypes.json');
  }
  return subTypes;
}

export async function fetchLangSubTypes(lang: string = 'en') {
  const originalSubTypes = await fetchOriginalSubTypes();
  return await fetchAndAddLanguageToItems(lang, originalSubTypes, 'subtypes.json');
}

