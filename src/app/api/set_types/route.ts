import { NextResponse } from 'next/server';
import { getAllSetTypes } from '@/lib/sets/sets';


export async function GET() {
  const setTypes = await getAllSetTypes();
  return NextResponse.json(setTypes, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}