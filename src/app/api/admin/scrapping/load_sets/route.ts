import { NextResponse } from 'next/server';
import type { CardSet } from '@/lib/sets/sets';
import { fetchAllSets } from '@/lib/jsdelivr/sets';
import { createOrUpdateSets, getAllSetCodes } from '@/lib/sets/sets';
import { auth } from '@/lib/auth/server';
import { isAdminUser } from '@/lib/auth/admin';

export async function GET() {
    const { data: session } = await auth.getSession();
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isAdminUser(session.user)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const dbSetCodes: string[] = await getAllSetCodes();
    const fetchSets: CardSet[] = await fetchAllSets();
    const sets = fetchSets.filter(fs => !dbSetCodes.includes(fs.code));
    const updatedSets = await createOrUpdateSets(sets);

    return NextResponse.json(updatedSets);
}