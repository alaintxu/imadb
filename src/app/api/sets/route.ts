import { NextRequest, NextResponse } from 'next/server';
import { CardSetType, getSets } from '@/lib/sets/sets';

const VALID_TYPES: readonly CardSetType[] = [
  'level',
  'villain',
  'modular',
  'nemesis',
  'unknown',
  'other',
  'core',
  'hero',
  'scenario',
  'story',
  'standard',
  'expert',
  'hero_special',
  'evidence',
  'leader',
  'main_scheme',
];

function isCardSetType(value: string): value is CardSetType {
  return VALID_TYPES.includes(value as CardSetType);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const setCodes = searchParams.getAll('setCode').filter(Boolean);
  const villainCode = searchParams.get('villain') ?? undefined;
  const packCode = searchParams.get('pack') ?? undefined;
  const typeParam = searchParams.get('type');
  const type = typeParam && isCardSetType(typeParam) ? typeParam : undefined;

  if (typeParam && !isCardSetType(typeParam)) {
    return NextResponse.json({ error: 'Invalid set type' }, { status: 400 });
  }

  const sets = await getSets({
    setCodes: setCodes.length > 0 ? setCodes : undefined,
    villainCode,
    type,
    packCode,
  });

  return NextResponse.json(sets, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}
