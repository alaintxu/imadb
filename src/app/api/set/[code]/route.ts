import { NextRequest, NextResponse } from 'next/server';
import { getSetByCode } from '@/lib/sets/sets';
import { CardSet } from '@/lib/sets/set_types';

type Params = { code: string };

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { code } = await params;
    const normalized = code.trim().toLowerCase();

    const set: CardSet | null = await getSetByCode(normalized);

    if (!set) {
        return NextResponse.json({ error: `Set not found (${normalized})` }, { status: 404 });
    }

    return NextResponse.json(set);
}