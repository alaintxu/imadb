import {db} from '../db';
import type { CardSet, CardSetType } from '@/store/entities/sets';

export async function getAllSets() {
  const sets = (await db`SELECT * FROM sets`) as CardSet[];
  return sets;
}

export async function getSetByCode(code: string) {
  const set = (await db`SELECT * FROM sets WHERE code = ${code}`) as CardSet[];
  return set[0];
}

export async function getSetsByType(type: CardSetType) {
  const sets = (await db`SELECT * FROM sets WHERE set_type = ${type}`) as CardSet[];
  return sets;
}