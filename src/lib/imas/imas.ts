import {db} from '@/lib/db';

export type IMA = {
    id: string;
    title: string;
    villain_code: string;
    description: string;
    modular_set_codes: string[]; // Array of related set codes
    tags: string[]; // Array of tag codes
}

export async function getAllIMAs() {
  const imas: IMA[] = (await db`
    SELECT
      i.*,
      COALESCE(
        ARRAY(
          SELECT rs.set_code
          FROM ima_related_sets rs
          WHERE rs.ima_id = i.id
          ORDER BY rs.sort_order
        ),
        ARRAY[]::TEXT[]
      ) AS modular_set_codes,
      COALESCE(
        ARRAY(
          SELECT ta.tag_code
          FROM ima_tag_assignments ta
          WHERE ta.ima_id = i.id
          ORDER BY ta.tag_code
        ),
        ARRAY[]::TEXT[]
      ) AS tags
    FROM imas i
  `) as IMA[];
  return imas;
}

export async function getIMAByID(id: string) {
  const ima: IMA[] = (await db`
    SELECT
      i.*,
      COALESCE(
        ARRAY(
          SELECT rs.set_code
          FROM ima_related_sets rs
          WHERE rs.ima_id = i.id
          ORDER BY rs.sort_order
        ),
        ARRAY[]::TEXT[]
      ) AS modular_set_codes,
      COALESCE(
        ARRAY(
          SELECT ta.tag_code
          FROM ima_tag_assignments ta
          WHERE ta.ima_id = i.id
          ORDER BY ta.tag_code
        ),
        ARRAY[]::TEXT[]
      ) AS tags
    FROM imas i
    WHERE i.id = ${id}
  `) as IMA[];
  return ima[0];
}

export async function getIMAsByVillainCode(villain_code: string) {
  const imas: IMA[] = (await db`
    SELECT
      i.*,
      COALESCE(
        ARRAY(
          SELECT rs.set_code
          FROM ima_related_sets rs
          WHERE rs.ima_id = i.id
          ORDER BY rs.sort_order
        ),
        ARRAY[]::TEXT[]
      ) AS modular_set_codes,
      COALESCE(
        ARRAY(
          SELECT ta.tag_code
          FROM ima_tag_assignments ta
          WHERE ta.ima_id = i.id
          ORDER BY ta.tag_code
        ),
        ARRAY[]::TEXT[]
      ) AS tags
    FROM imas i
    WHERE i.villain_code = ${villain_code}
  `) as IMA[];
  return imas;
}