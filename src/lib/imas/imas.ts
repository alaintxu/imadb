import { db, imaRelatedSetsTable, imaTagAssignmentsTable, imasTable } from '@/db';
import { eq, and, asc } from 'drizzle-orm';

export type IMA = {
    id: string;
    slug: string;
    title: string;
    villain_code: string;
    source_url: string | null;
    author_username: string;
    original: boolean;
    description: string;
    special_rules: string | null;
    modular_set_codes: string[];
    tags: string[];
}

export type IMAFilters = {
  villainCode?: string;
  authorUsername?: string;
  modularSetCodes?: string[];
  tags?: string[];
  original?: boolean;
  limit?: number;
};

function buildWhereConditions(filters: IMAFilters) {
  const conditions = [];

  if (filters.villainCode) {
    conditions.push(eq(imasTable.villainCode, filters.villainCode));
  }

  if (filters.authorUsername) {
    conditions.push(eq(imasTable.authorUsername, filters.authorUsername));
  }

  if (filters.original !== undefined) {
    conditions.push(eq(imasTable.original, filters.original));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function getIMAs(filters: IMAFilters = {}) {
  const whereConditions = buildWhereConditions(filters);
  
  const baseQuery = db.select().from(imasTable);
  
  if (whereConditions) {
    baseQuery.where(whereConditions);
  }

  if (filters.limit) {
    baseQuery.limit(filters.limit);
  }

  const imaRows = await baseQuery;

  if (filters.modularSetCodes?.length || filters.tags?.length) {
    const filteredIMAs: typeof imaRows = [];
    
    for (const ima of imaRows) {
      let matches = true;
      
      for (const code of filters.modularSetCodes ?? []) {
        const relatedSet = await db
          .select()
          .from(imaRelatedSetsTable)
          .where(and(eq(imaRelatedSetsTable.imaId, ima.id), eq(imaRelatedSetsTable.setCode, code)))
          .limit(1);
        
        if (relatedSet.length === 0) {
          matches = false;
          break;
        }
      }
      
      if (!matches) continue;
      
      for (const tag of filters.tags ?? []) {
        const tagAssignment = await db
          .select()
          .from(imaTagAssignmentsTable)
          .where(and(eq(imaTagAssignmentsTable.imaId, ima.id), eq(imaTagAssignmentsTable.tagCode, tag)))
          .limit(1);
        
        if (tagAssignment.length === 0) {
          matches = false;
          break;
        }
      }
      
      if (matches) {
        filteredIMAs.push(ima);
      }
    }
    
    return Promise.all(filteredIMAs.map(enrichIMA));
  }

  return Promise.all(imaRows.map(enrichIMA));
}

async function enrichIMA(ima: typeof imasTable.$inferSelect): Promise<IMA> {
  const relatedSets = await db
    .select({ setCode: imaRelatedSetsTable.setCode })
    .from(imaRelatedSetsTable)
    .where(eq(imaRelatedSetsTable.imaId, ima.id))
    .orderBy(asc(imaRelatedSetsTable.sortOrder));

  const tagAssignments = await db
    .select({ tagCode: imaTagAssignmentsTable.tagCode })
    .from(imaTagAssignmentsTable)
    .where(eq(imaTagAssignmentsTable.imaId, ima.id))
    .orderBy(asc(imaTagAssignmentsTable.tagCode));

  return {
    id: ima.id,
    slug: ima.slug,
    title: ima.title,
    villain_code: ima.villainCode,
    source_url: ima.sourceUrl,
    author_username: ima.authorUsername,
    original: ima.original,
    description: ima.description,
    special_rules: ima.specialRules,
    modular_set_codes: relatedSets.map(r => r.setCode),
    tags: tagAssignments.map(t => t.tagCode),
  };
}

export async function getAllIMAs() {
  return getIMAs();
}

export async function getIMAByID(id: string) {
  const result = await db.select().from(imasTable).where(eq(imasTable.id, id));
  if (!result[0]) return undefined;
  return enrichIMA(result[0]);
}

export async function getIMAsByVillainCode(villainCode: string) {
  return getIMAs({ villainCode });
}
