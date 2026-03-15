import { NextRequest, NextResponse } from 'next/server';
import { getSetsByType } from '@/lib/sets/sets';
import type { CardSetType } from '@/store/entities/sets';

const VALID_TYPES = ['level', 'villain', 'modular', 'nemesis', 'unknown', 'other'] as const;

function isCardSetType(value: string): value is CardSetType {
    return (VALID_TYPES as readonly string[]).includes(value);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;
    const normalizedType = type.trim().toLowerCase();

    if (!isCardSetType(normalizedType)) {
        return NextResponse.json({ error: 'Invalid set type' }, { status: 400 });
    }

    const sets = await getSetsByType(normalizedType);

    return NextResponse.json(sets);
}