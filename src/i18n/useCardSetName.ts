"use client";
import { useTranslation } from "@/i18n";
import type { CardSet } from "@/lib/sets/sets";

export function useCardSetName(set: CardSet): string {
  const { language } = useTranslation();
  return set.name[language] ?? set.name["en"] ?? set.code;
}

export function useSortSetsByName(sets: CardSet[]): CardSet[] {
  const { language } = useTranslation();
  return [...sets].sort((a, b) => {
    const nameA = a.name[language] ?? a.name["en"] ?? a.code;
    const nameB = b.name[language] ?? b.name["en"] ?? b.code;
    return nameA.localeCompare(nameB);
  });
}
