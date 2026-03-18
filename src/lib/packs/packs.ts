import { db } from '@/lib/db';

export type Pack = {
    code: string;
    cgdb_id: number;
    date_release: string;
    name: string;
    octgn_id: string;
    pack_type_code: string;
    position: number;
    size: number;
}

export async function getAllPacks() {
  const packs = (await db`SELECT * FROM packs`) as Pack[];
  return packs;
}

export async function getPackByCode(code: string) {
  const pack = (await db`SELECT * FROM packs WHERE code = ${code}`) as Pack[];
  return pack[0];
}

export async function getPacksByType(typeCode: string) {
  const packs = (await db`SELECT * FROM packs WHERE pack_type_code = ${typeCode}`) as Pack[];
  return packs;
}
