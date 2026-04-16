import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
} from 'drizzle-orm/pg-core';


/***** Set Type Enum *****/
export const setTypeEnum = pgEnum('set_type_enum', [
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
]);


/***** Packs Table *****/
export const packsTable = pgTable('packs', {
  code: text('code').primaryKey(),
  cgdbId: integer('cgdb_id'),
  dateRelease: date('date_release', { mode: 'string' }),
  name: jsonb('name').$type<Record<string, string>>().notNull(),
  octgnId: text('octgn_id'),
  packTypeCode: text('pack_type_code'),
  position: integer('position'),
  size: integer('size'),
}, (table) => [
  index('packs_pack_type_code_idx').on(table.packTypeCode),
  index('packs_position_idx').on(table.position),
]);


/***** Sets Table *****/
export const setsTable = pgTable('sets', {
  code: text('code').primaryKey(),
  name: jsonb('name').$type<Record<string, string>>().notNull(),
  setType: setTypeEnum('set_type').notNull(),
  packCode: text('pack_code').references(() => packsTable.code, { onDelete: 'set null' }),
  firstCardCode: text('first_card_code'),
  size: integer('size'),
}, (table) => [
  index('sets_pack_code_idx').on(table.packCode),
  index('sets_set_type_idx').on(table.setType),
]);


/***** IMAs Table *****/
export const imasTable = pgTable('imas', {
  id: uuid('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  villainCode: text('villain_code').notNull().references(() => setsTable.code),
  sourceUrl: text('source_url'),
  authorUsername: text('author_username').notNull(),
  original: boolean('original').notNull().default(false),
  description: text('description').notNull(),
  specialRules: text('special_rules'),
}, (table) => [
  index('imas_villain_code_idx').on(table.villainCode),
  index('imas_author_username_idx').on(table.authorUsername),
  index('imas_original_idx').on(table.original),
]);


/***** IMA Tags Table *****/
export const imaTagsTable = pgTable('ima_tags', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
});


/***** IMA Tag Assignments Table *****/
export const imaTagAssignmentsTable = pgTable(
  'ima_tag_assignments',
  {
    imaId: uuid('ima_id').notNull().references(() => imasTable.id, { onDelete: 'cascade' }),
    tagCode: text('tag_code').notNull().references(() => imaTagsTable.code, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.imaId, table.tagCode] })]
);

/***** IMA Related Sets Table *****/
export const imaRelatedSetsTable = pgTable(
  'ima_related_sets',
  {
    imaId: uuid('ima_id').notNull().references(() => imasTable.id, { onDelete: 'cascade' }),
    setCode: text('set_code').notNull().references(() => setsTable.code),
    sortOrder: integer('sort_order').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.imaId, table.setCode] }),
    check('ima_related_sets_sort_order_positive', sql`${table.sortOrder} > 0`),
  ]
);