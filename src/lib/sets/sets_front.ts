import type { CardSet } from './sets';

export function sortSetsByName(sets: CardSet[], language: string = 'es'): CardSet[] {
  return sets.sort((a, b) => {
    const nameA = a.name[language] ?? a.name['en'] ?? a.code;
    const nameB = b.name[language] ?? b.name['en'] ?? b.code;
    return nameA.localeCompare(nameB);
  });
}

export function cardSetNameByLanguage(set: CardSet, language: string = 'es'): string {
  return set.name[language] ?? set.name['en'] ?? set.code;
}

export function useSortSetsByFirstCardCode(sets: CardSet[]): CardSet[] {
  return [...sets].sort((a, b) => {
    const codeA = a.first_card_code ?? a.code;
    const codeB = b.first_card_code ?? b.code;
    return codeA.localeCompare(codeB);
  });
}