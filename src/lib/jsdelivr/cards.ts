import { fetchAndAddLanguageToItems, fetchCdnJson, LANGS } from '@/lib/jsdelivr/common';
import type { LocalizedFields } from '@/lib/jsdelivr/common';

export type JsonCard = {
    code: string;
    set_code: string;
    flavor?: string;
    name: string;
    text: string;
    traits: string;
}

export type Card = LocalizedFields<JsonCard, 'name' | 'text' | 'flavor' | 'traits'>;


export async function fetchOriginalCards(packCodes: string[]) {
    let jsonCards: JsonCard[] = [];
    for (const packCode of packCodes) {
        try {
            const jsonCardsForSet = await fetchCdnJson<JsonCard[]>(`pack/${packCode}_encounter.json`);
            jsonCards = jsonCards.concat(jsonCardsForSet);
        } catch {
            console.warn(`No encounter cards found for pack ${packCode}`);
        }
        try {
            const jsonCardsForSetHero = await fetchCdnJson<JsonCard[]>(`pack/${packCode}.json`);
            jsonCards = jsonCards.concat(jsonCardsForSetHero);
        } catch {
            console.warn(`No hero cards found for pack ${packCode}`)
        }
    }
    
    const cards: Card[] = jsonCards.map(card => ({
        ...card,
        name: { en: card.name },
        text: { en: card.text },
        flavor: { en: card.flavor || '' },
        traits: { en: card.traits || '' }
    }));
    
    return cards;
}


export async function fetchOriginalCardsSingleSet(packCode: string) {
    return await fetchOriginalCards([packCode]);
}

export async function fetchAllCards(packCodes: string[]) {
    let cards: Card[] = await fetchOriginalCards(packCodes);
    for (const lang of LANGS) {
        for (const packCode of packCodes) {
            cards = await fetchAndAddLanguageToItems(lang, cards, `pack/${packCode}_encounter.json`);
        }
    }
    return cards;
}
