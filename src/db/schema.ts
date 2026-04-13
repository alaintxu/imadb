import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
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
export const packs = pgTable('packs', {
  code: text('code').primaryKey(),
  cgdbId: integer('cgdb_id'),
  dateRelease: date('date_release', { mode: 'string' }),
  name: jsonb('name').$type<Record<string, string>>().notNull(),
  octgnId: text('octgn_id'),
  packTypeCode: text('pack_type_code'),
  position: integer('position'),
  size: integer('size'),
});


/***** Sets Table *****/
export const sets = pgTable('sets', {
  code: text('code').primaryKey(),
  name: jsonb('name').$type<Record<string, string>>().notNull(),
  setType: setTypeEnum('set_type').notNull(),
  packCode: text('pack_code').references(() => packs.code, { onDelete: 'set null' }),
  size: integer('size'),
});


/***** IMAs Table *****/
export const imas = pgTable('imas', {
  id: uuid('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  villainCode: text('villain_code').notNull().references(() => sets.code),
  sourceUrl: text('source_url'),
  authorUsername: text('author_username').notNull(),
  original: boolean('original').notNull().default(false),
  description: text('description').notNull(),
  specialRules: text('special_rules'),
});


/***** IMA Tags Table *****/
export const imaTags = pgTable('ima_tags', {
  code: text('code').primaryKey(),
  name: text('name').notNull(),
});


/***** IMA Tag Assignments Table *****/
export const imaTagAssignments = pgTable(
  'ima_tag_assignments',
  {
    imaId: uuid('ima_id').notNull().references(() => imas.id, { onDelete: 'cascade' }),
    tagCode: text('tag_code').notNull().references(() => imaTags.code, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.imaId, table.tagCode] })]
);

/***** IMA Related Sets Table *****/
export const imaRelatedSets = pgTable(
  'ima_related_sets',
  {
    imaId: uuid('ima_id').notNull().references(() => imas.id, { onDelete: 'cascade' }),
    setCode: text('set_code').notNull().references(() => sets.code),
    sortOrder: integer('sort_order').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.imaId, table.setCode] }),
    check('ima_related_sets_sort_order_positive', sql`${table.sortOrder} > 0`),
  ]
);