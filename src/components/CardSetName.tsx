"use client";
import { useTranslation } from "@/i18n";
import type { CardSet } from "@/lib/sets/sets";

function getCardSetName(set: CardSet, language: string): string {
  return set.name[language] ?? set.name["en"] ?? set.code;
}

export function CardSetName({ set }: { set: CardSet }) {
  const { language } = useTranslation();
  return <>{getCardSetName(set, language)}</>;
}

export function CardSetNameWithCode({ set }: { set: CardSet }) {
  const { language } = useTranslation();
  return <>{getCardSetName(set, language)} ({set.code})</>;
}
