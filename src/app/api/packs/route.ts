import { NextResponse } from 'next/server';
import { getAllPacks } from '@/lib/packs/packs';

export async function GET() {
  const packs = await getAllPacks();
  return NextResponse.json(packs, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}
