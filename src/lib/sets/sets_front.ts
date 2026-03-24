import type { CardSet } from './sets';

export function sortSetsByName(sets: CardSet[], language: string = 'es'): CardSet[] {
  return sets.sort((a, b) => {
    const nameA = a.name[language] ?? a.name.en;
    const nameB = b.name[language] ?? b.name.en;
    return nameA.localeCompare(nameB);
  });
}

export function cardSetNameByLanguage(set: CardSet, language: string = 'es'): string {
  return set.name[language] ?? set.name.en;
}