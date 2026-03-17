import { NextRequest, NextResponse } from 'next/server';
import { getIMAByID } from '@/lib/imas/imas';
import { IMA } from '@/store/entities/imas';

type Params = { id: string };

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { id } = await params;
    const normalized = id.trim().toLowerCase();

    const set: IMA | null = await getIMAByID(normalized);

    if (!set) {
        return NextResponse.json({ error: `IMA not found (${normalized})` }, { status: 404 });
    }

    return NextResponse.json(set);
}