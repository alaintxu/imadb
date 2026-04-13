CREATE TYPE "public"."set_type_enum" AS ENUM('level', 'villain', 'modular', 'nemesis', 'unknown', 'other', 'core', 'hero', 'scenario', 'story', 'standard', 'expert', 'hero_special', 'evidence', 'leader', 'main_scheme');--> statement-breakpoint
CREATE TABLE "ima_related_sets" (
	"ima_id" uuid NOT NULL,
	"set_code" text NOT NULL,
	"sort_order" integer NOT NULL,
	CONSTRAINT "ima_related_sets_ima_id_set_code_pk" PRIMARY KEY("ima_id","set_code"),
	CONSTRAINT "ima_related_sets_sort_order_positive" CHECK ("ima_related_sets"."sort_order" > 0)
);
--> statement-breakpoint
CREATE TABLE "ima_tag_assignments" (
	"ima_id" uuid NOT NULL,
	"tag_code" text NOT NULL,
	CONSTRAINT "ima_tag_assignments_ima_id_tag_code_pk" PRIMARY KEY("ima_id","tag_code")
);
--> statement-breakpoint
CREATE TABLE "ima_tags" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "imas" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"villain_code" text NOT NULL,
	"source_url" text,
	"author_username" text NOT NULL,
	"original" boolean DEFAULT false NOT NULL,
	"description" text NOT NULL,
	"special_rules" text,
	CONSTRAINT "imas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "packs" (
	"code" text PRIMARY KEY NOT NULL,
	"cgdb_id" integer,
	"date_release" date,
	"name" jsonb NOT NULL,
	"octgn_id" text,
	"pack_type_code" text,
	"position" integer,
	"size" integer
);
--> statement-breakpoint
CREATE TABLE "sets" (
	"code" text PRIMARY KEY NOT NULL,
	"name" jsonb NOT NULL,
	"set_type" "set_type_enum" NOT NULL,
	"pack_code" text,
	"size" integer
);
--> statement-breakpoint
ALTER TABLE "ima_related_sets" ADD CONSTRAINT "ima_related_sets_ima_id_imas_id_fk" FOREIGN KEY ("ima_id") REFERENCES "public"."imas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ima_related_sets" ADD CONSTRAINT "ima_related_sets_set_code_sets_code_fk" FOREIGN KEY ("set_code") REFERENCES "public"."sets"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ima_tag_assignments" ADD CONSTRAINT "ima_tag_assignments_ima_id_imas_id_fk" FOREIGN KEY ("ima_id") REFERENCES "public"."imas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ima_tag_assignments" ADD CONSTRAINT "ima_tag_assignments_tag_code_ima_tags_code_fk" FOREIGN KEY ("tag_code") REFERENCES "public"."ima_tags"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "imas" ADD CONSTRAINT "imas_villain_code_sets_code_fk" FOREIGN KEY ("villain_code") REFERENCES "public"."sets"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_pack_code_packs_code_fk" FOREIGN KEY ("pack_code") REFERENCES "public"."packs"("code") ON DELETE set null ON UPDATE no action;