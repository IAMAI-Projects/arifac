import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_contact_info_entries_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_contact_info_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "_pages_v_version_contact_info_entries_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_contact_info_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "form_section_eyebrow" varchar DEFAULT 'Send a Message';
  ALTER TABLE "pages" ADD COLUMN "form_section_heading" varchar DEFAULT 'How can we help you?';
  ALTER TABLE "pages" ADD COLUMN "contact_info_eyebrow" varchar DEFAULT 'Contact Information';
  ALTER TABLE "_pages_v" ADD COLUMN "version_form_section_eyebrow" varchar DEFAULT 'Send a Message';
  ALTER TABLE "_pages_v" ADD COLUMN "version_form_section_heading" varchar DEFAULT 'How can we help you?';
  ALTER TABLE "_pages_v" ADD COLUMN "version_contact_info_eyebrow" varchar DEFAULT 'Contact Information';
  ALTER TABLE "pages_contact_info_entries_links" ADD CONSTRAINT "pages_contact_info_entries_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_contact_info_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_contact_info_entries" ADD CONSTRAINT "pages_contact_info_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_contact_info_entries_links" ADD CONSTRAINT "_pages_v_version_contact_info_entries_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_contact_info_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_contact_info_entries" ADD CONSTRAINT "_pages_v_version_contact_info_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_contact_info_entries_links_order_idx" ON "pages_contact_info_entries_links" USING btree ("_order");
  CREATE INDEX "pages_contact_info_entries_links_parent_id_idx" ON "pages_contact_info_entries_links" USING btree ("_parent_id");
  CREATE INDEX "pages_contact_info_entries_order_idx" ON "pages_contact_info_entries" USING btree ("_order");
  CREATE INDEX "pages_contact_info_entries_parent_id_idx" ON "pages_contact_info_entries" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_contact_info_entries_links_order_idx" ON "_pages_v_version_contact_info_entries_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_contact_info_entries_links_parent_id_idx" ON "_pages_v_version_contact_info_entries_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_contact_info_entries_order_idx" ON "_pages_v_version_contact_info_entries" USING btree ("_order");
  CREATE INDEX "_pages_v_version_contact_info_entries_parent_id_idx" ON "_pages_v_version_contact_info_entries" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_contact_info_entries_links" CASCADE;
  DROP TABLE "pages_contact_info_entries" CASCADE;
  DROP TABLE "_pages_v_version_contact_info_entries_links" CASCADE;
  DROP TABLE "_pages_v_version_contact_info_entries" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "form_section_eyebrow";
  ALTER TABLE "pages" DROP COLUMN "form_section_heading";
  ALTER TABLE "pages" DROP COLUMN "contact_info_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_form_section_eyebrow";
  ALTER TABLE "_pages_v" DROP COLUMN "version_form_section_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_contact_info_eyebrow";`)
}
