import { NextRequest, NextResponse } from 'next/server';
import { getSetsByType } from '@/lib/sets/sets';
import type { CardSetType } from '@/lib/sets/set_types';

const VALID_TYPES: CardSetType[] = ['level', 'villain', 'modular', 'nemesis', 'unknown', 'other'];

type Params = { type: CardSetType };

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { type } = await params;
    const normalizedType = type.trim().toLowerCase() as CardSetType;

    if (!VALID_TYPES.includes(normalizedType)) {
        return NextResponse.json({ error: 'Invalid set type' }, { status: 400 });
    }

    const sets = await getSetsByType(normalizedType);

    return NextResponse.json(sets);
}