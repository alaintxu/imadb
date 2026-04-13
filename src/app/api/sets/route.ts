import { NextResponse } from 'next/server';
import { getAllSets } from '@/lib/sets/sets';


export async function GET() {
  const sets = await getAllSets();
  return NextResponse.json(sets, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}
