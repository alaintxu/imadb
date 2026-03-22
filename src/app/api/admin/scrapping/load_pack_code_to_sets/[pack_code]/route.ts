import { NextRequest, NextResponse } from 'next/server';
import type { CardSet } from '@/lib/sets/sets';
import { createOrUpdateSets, getAllSets } from '@/lib/sets/sets';
import { fetchOriginalCardsSingleSet }  from '@/lib/jsdelivr/cards';

type Params = { pack_code: string };

type SetSizeMap = {
    [setCode: string]: number;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { pack_code } = await params;

    const allSets: CardSet[] = await getAllSets();
    const setLengthMap: SetSizeMap = {};
    try{
        const cards = await fetchOriginalCardsSingleSet(pack_code);
        for (const card of cards) {
            if (card.set_code in setLengthMap) {
                setLengthMap[card.set_code] += 1;
            } else {
                setLengthMap[card.set_code] = 1;
            }
        }
        const filteredSets: CardSet[] = allSets.filter(set => set.code in setLengthMap);
        const setsToUpdate: CardSet[] = filteredSets.map(set => ({
            ...set,
            size: setLengthMap[set.code],
            pack_code: pack_code
        }));
        const updatedSets = await createOrUpdateSets(setsToUpdate);

        return NextResponse.json(updatedSets.filter(s => s.pack_code === pack_code));
    } catch (error) {
        return NextResponse.json({ error: `Error fetching cards for pack code ${pack_code}: ${error}` }, { status: 500 });
    }
}
