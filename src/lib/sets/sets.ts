import { db, setsTable } from '@/db';
import { eq, sql } from 'drizzle-orm';

export type CardSetType = 'level' | 'villain' | 'modular' | 'nemesis' | 'unknown' | 'other' | 'core' | 'hero' | 'scenario' | 'story' | 'standard' | 'expert' | 'hero_special' | 'evidence' | 'leader' | 'main_scheme';

export type CardSet = {
  code: string;
  name: Record<string, string>;
  set_type: CardSetType;
  pack_code?: string | null;
  first_card_code?: string | null;
  size?: number | null;
}

function toCardSetRow(row: typeof setsTable.$inferSelect): CardSet {
  return {
    code: row.code,
    name: row.name,
    set_type: row.setType as CardSetType,
    pack_code: row.packCode,
    first_card_code: row.firstCardCode,
    size: row.size,
  };
}

export async function getAllSets() {
  const result = await db.select().from(setsTable);
  return result.map(toCardSetRow);
}

export async function getAllSetCodes() {
  const result = await db.select({ code: setsTable.code }).from(setsTable);
  return result.map(s => s.code);
}

export async function getSetByCode(code: string) {
  const result = await db.select().from(setsTable).where(eq(setsTable.code, code));
  return result[0] ? toCardSetRow(result[0]) : undefined;
}

export async function getSetsByType(type: CardSetType) {
  const result = await db.select().from(setsTable).where(eq(setsTable.setType, type));
  return result.map(toCardSetRow);
}

export async function getAllSetTypes() {
  const result = await db.selectDistinct({ setType: setsTable.setType }).from(setsTable);
  return result.map(t => t.setType as CardSetType);
}

export async function createOrUpdateSets(cardSets: CardSet[]) {
  const rows = await db.insert(setsTable).values(
    cardSets.map((s) => ({
      code: s.code,
      name: s.name,
      setType: s.set_type,
      packCode: s.pack_code ?? null,
      firstCardCode: s.first_card_code ?? null,
      size: s.size ?? null,
    }))
  ).onConflictDoUpdate({
    target: setsTable.code,
    set: {
      name: sql`excluded.name`,
      setType: sql`excluded.set_type`,
      packCode: sql`excluded.pack_code`,
      firstCardCode: sql`excluded.first_card_code`,
      size: sql`excluded.size`,
    },
  }).returning();

  return rows.map(toCardSetRow);
}

export async function createOrUpdateSet(cardSet: CardSet) {
  const rows = await createOrUpdateSets([cardSet]);
  if (!rows[0]) throw new Error('Upsert failed for set');
  return rows[0];
}
