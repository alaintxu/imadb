CREATE INDEX "imas_villain_code_idx" ON "imas" USING btree ("villain_code");--> statement-breakpoint
CREATE INDEX "imas_author_username_idx" ON "imas" USING btree ("author_username");--> statement-breakpoint
CREATE INDEX "imas_original_idx" ON "imas" USING btree ("original");--> statement-breakpoint
CREATE INDEX "packs_pack_type_code_idx" ON "packs" USING btree ("pack_type_code");--> statement-breakpoint
CREATE INDEX "packs_position_idx" ON "packs" USING btree ("position");--> statement-breakpoint
CREATE INDEX "sets_pack_code_idx" ON "sets" USING btree ("pack_code");--> statement-breakpoint
CREATE INDEX "sets_set_type_idx" ON "sets" USING btree ("set_type");