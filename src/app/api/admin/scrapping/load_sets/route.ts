import { NextResponse } from 'next/server';
import type { CardSet } from '@/lib/sets/sets';
import { fetchAllSets } from '@/lib/jsdelivr/sets';
import { createOrUpdateSets, getAllSetCodes } from '@/lib/sets/sets';

export async function GET() {
    const dbSetCodes: string[] = await getAllSetCodes();
    const fetchSets: CardSet[] = await fetchAllSets();
    const sets = fetchSets.filter(fs => !dbSetCodes.includes(fs.code));
    const updatedSets = await createOrUpdateSets(sets);

    return NextResponse.json(updatedSets);
}