import type { Pack } from "@/lib/packs/packs";

export function packNameByLanguage(pack: Pack, language: string = 'es'): string {
  return pack.name[language] ?? pack.name['en'] ?? pack.code;
}