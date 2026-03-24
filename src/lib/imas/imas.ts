import {db} from '@/lib/db';

export type IMA = {
    id: string;
    slug: string;
    title: string;
    villain_code: string;
    source_url: string;
    author_username: string;
    original: boolean;
    description: string;
    special_rules: string;
    modular_set_codes: string[]; // Array of related set codes
    tags: string[]; // Array of tag codes
}

export type IMAFilters = {
  villainCode?: string;
  authorUsername?: string;
  modularSetCodes?: string[];
  tags?: string[];
  original?: boolean;
};

const IMA_SELECT_QUERY = `
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
`;

export async function getIMAs(filters: IMAFilters = {}) {
  const whereClauses: string[] = [];
  const params: Array<string | boolean> = [];

  if (filters.villainCode) {
    params.push(filters.villainCode);
    whereClauses.push(`i.villain_code = $${params.length}`);
  }

  if (filters.authorUsername) {
    params.push(filters.authorUsername);
    whereClauses.push(`i.author_username = $${params.length}`);
  }

  if (filters.original !== undefined) {
    params.push(filters.original);
    whereClauses.push(`i.original = $${params.length}`);
  }

  filters.modularSetCodes?.forEach((code) => {
    params.push(code);
    whereClauses.push(`EXISTS (
      SELECT 1
      FROM ima_related_sets rs
      WHERE rs.ima_id = i.id
        AND rs.set_code = $${params.length}
    )`);
  });

  filters.tags?.forEach((tag) => {
    params.push(tag);
    whereClauses.push(`EXISTS (
      SELECT 1
      FROM ima_tag_assignments ta
      WHERE ta.ima_id = i.id
        AND ta.tag_code = $${params.length}
    )`);
  });

  const whereQuery = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
  const query = `${IMA_SELECT_QUERY} ${whereQuery}`;

  return (await db.query(query, params)) as IMA[];
}

export async function getAllIMAs() {
  return getIMAs();
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
  return getIMAs({ villainCode: villain_code });
}