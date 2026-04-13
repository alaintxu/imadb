import { NextRequest, NextResponse } from 'next/server';
import { CardSet, getSetByCode } from '@/lib/sets/sets';

type Params = { code: string };

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { code } = await params;
    const normalized = code.trim().toLowerCase();

    const set: CardSet | undefined = await getSetByCode(normalized);

    if (!set) {
        return NextResponse.json({ error: `Set not found (${normalized})` }, { status: 404 });
    }

    return NextResponse.json(set, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}