import { NextResponse } from 'next/server';
import { CardSet } from '@/store/entities/sets';

export async function GET() {
    const langs = ["de", "es", "fr", "it", "ko"];
    const res = await fetch(`https://cdn.jsdelivr.net/gh/zzorba/marvelsdb-json-data@master/sets.json`);

    for (const lang of langs) {
        const langRes = await fetch(`https://cdn.jsdelivr.net/gh/zzorba/marvelsdb-json-data@master/translations/${lang}/sets.json`);
        const langSets: CardSet[] = await langRes.json();
    }
    const sets: CardSet[] = await res.json();    

    return NextResponse.json(sets);
}