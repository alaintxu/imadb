import { NextRequest, NextResponse } from 'next/server';
import { CardSetType, getSetsByType } from '@/lib/sets/sets';

const VALID_TYPES = ['level', 'villain', 'modular', 'nemesis', 'unknown', 'other'] as const;

function isCardSetType(value: string): value is CardSetType {
    return (VALID_TYPES as readonly string[]).includes(value);
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;
    const normalizedType = type.trim().toLowerCase();

    if (!isCardSetType(normalizedType)) {
        return NextResponse.json({ error: 'Invalid set type' }, { status: 400 });
    }

    const sets = await getSetsByType(normalizedType);

    return NextResponse.json(sets, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}