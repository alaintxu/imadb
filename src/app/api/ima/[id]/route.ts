import { NextRequest, NextResponse } from 'next/server';
import { getIMAByID } from '@/lib/imas/imas';
import type { IMA } from '@/lib/imas/imas';

type Params = { id: string };

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { id } = await params;
    const normalized = id.trim().toLowerCase();

    const ima: IMA | undefined = await getIMAByID(normalized);

    if (!ima) {
        return NextResponse.json({ error: `IMA not found (${normalized})` }, { status: 404 });
    }

    return NextResponse.json(ima, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}