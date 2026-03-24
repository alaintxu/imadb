import { db } from '../db';

export type CardSetType = 'level' | 'villain' | 'modular' | 'nemesis' | 'unknown' | 'other' | 'core' | 'hero' | 'scenario' | 'story' | 'standard' | 'expert' | 'hero_special' | 'evidence' | 'leader' | 'main_scheme';

export type CardSet = {
  code: string;
  name: Record<string, string>; // language code to name mapping
  set_type: CardSetType;
  pack_code?: string;
  size?: number;
}

export async function getAllSets() {
  const sets = (await db`SELECT * FROM sets`) as CardSet[];
  return sets;
}

export async function getAllSetCodes() {
  const setCodes = (await db`SELECT code FROM sets`) as { code: string }[];
  return setCodes.map(s => s.code);
}

export async function getSetByCode(code: string) {
  const set = (await db`SELECT * FROM sets WHERE code = ${code}`) as CardSet[];
  return set[0];
}

export async function getSetsByType(type: CardSetType) {
  const sets = (await db`SELECT * FROM sets WHERE set_type = ${type}`) as CardSet[];
  return sets;
}

export async function getAllSetTypes() {
  const types = (await db`SELECT DISTINCT set_type FROM sets`) as { set_type: CardSetType }[];
  return types.map(t => t.set_type);
}

export async function createOrUpdateSets(sets: CardSet[]) {
  const payload = JSON.stringify(
    sets.map((s) => ({
      code: s.code,
      name: s.name,
      set_type: s.set_type,
      pack_code: s.pack_code ?? null,
      size: s.size ?? null,
    }))
  );

  const rows = (await db`
    WITH input AS (
      SELECT *
      FROM jsonb_to_recordset(${payload}::jsonb)
      AS x(
        code text,
        name jsonb,
        set_type set_type_enum,
        pack_code text,
        size int
      )
    )
    INSERT INTO sets (code, name, set_type, pack_code, size)
    SELECT code, name, set_type, pack_code, size
    FROM input
    ON CONFLICT (code) DO UPDATE
    SET
      name = EXCLUDED.name,
      set_type = EXCLUDED.set_type,
      pack_code = EXCLUDED.pack_code,
      size = EXCLUDED.size
    RETURNING code, name, set_type, pack_code, size;
  `) as CardSet[];

  return rows;
}

export async function createOrUpdateSet(set: CardSet) {
  const rows = await createOrUpdateSets([set]);
  if (!rows[0]) throw new Error('Upsert failed for set');
  return rows[0];
}

