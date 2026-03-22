
export const LANGS = ["de", "es", "fr", "it", "ko"];

const BASE_CDN_URL = 'https://cdn.jsdelivr.net/gh/zzorba/marvelsdb-json-data@master';

export type OptionalKeys<T> = {
	[P in keyof T]-?: Pick<T, P> extends Required<Pick<T, P>> ? never : P;
}[keyof T];

export type LocalizedFields<T, K extends keyof T> = Omit<T, K> & {
	[P in Exclude<K, OptionalKeys<T>>]: Record<string, string>;
} & {
	[P in Extract<K, OptionalKeys<T>>]?: Record<string, string>;
}

type TranslatableEntity = {
	code: string;
	name: Record<string, string>;
}

type TranslationEntry = {
	code: string;
	name: string;
}

export async function fetchCdnJson<T>(path: string): Promise<T> {
	const res = await fetch(`${BASE_CDN_URL}/${path}`);
	if (!res.ok) {
		throw new Error(`CDN fetch failed for "${path}": ${res.status} ${res.statusText}`);
	}
	return await res.json();
}

export async function fetchAndAddLanguageToItems<T extends TranslatableEntity>(
	lang: string,
	items: T[],
	fileName: string
) {
	if (lang === 'en') return items;
	if (!LANGS.includes(lang)) {
		throw new Error(`Language ${lang} not supported`);
	}

    try{
        const translations = await fetchCdnJson<TranslationEntry[]>(`translations/${lang}/${fileName}`);
        const byCode = new Map(translations.map((translation) => [translation.code, translation.name]));

        return items.map((item) => {
            const translatedName = byCode.get(item.code);
            if (!translatedName) return item;

            return {
                ...item,
                name: {
                    ...item.name,
                    [lang]: translatedName,
                },
            };
        });
    } catch (error) {
        items.map((item) => ({
            ...item,
            name: {
                ...item.name,
                [lang]: item.name.en, // Fallback to English if translation fails
            },
        }));
        console.error(`Failed to fetch translations for ${fileName} in ${lang}:`, error);
        return items;
    }
}
