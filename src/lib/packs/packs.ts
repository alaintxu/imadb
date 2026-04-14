import { db, packsTable } from '@/db';
import { asc, eq } from 'drizzle-orm';

export type Pack = {
    code: string;
    cgdb_id: number | null;
    date_release: string | null;
    name: Record<string, string>;
    octgn_id: string | null;
    pack_type_code: string | null;
    position: number | null;
    size: number | null;
}

function toPackRow(row: typeof packsTable.$inferSelect): Pack {
  return {
    code: row.code,
    cgdb_id: row.cgdbId,
    date_release: row.dateRelease,
    name: row.name,
    octgn_id: row.octgnId,
    pack_type_code: row.packTypeCode,
    position: row.position,
    size: row.size,
  };
}

export async function getAllPacks() {
  const result = await db.select().from(packsTable).orderBy(asc(packsTable.position));
  return result.map(toPackRow);
}

export async function getPackByCode(code: string) {
  const result = await db.select().from(packsTable).where(eq(packsTable.code, code));
  return result[0] ? toPackRow(result[0]) : undefined;
}

export async function getPacksByType(typeCode: string) {
  const result = await db.select().from(packsTable)
    .where(eq(packsTable.packTypeCode, typeCode))
    .orderBy(asc(packsTable.position));
  return result.map(toPackRow);
}
