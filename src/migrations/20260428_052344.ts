import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_items_category" AS ENUM('industry-consultations', 'training-capacity-building', 'working-groups', 'flagship-programs');
  CREATE TABLE "gallery_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"category" "enum_gallery_items_category" DEFAULT 'industry-consultations' NOT NULL,
  	"description" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_page_about_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_section_title" varchar DEFAULT 'About These Engagements',
  	"about_section_description" varchar DEFAULT 'ARIFAC engagements are designed to support industry collaboration and capability building across AML/CFT domains. Participation includes stakeholders from financial institutions, fintech platforms, technology providers, and allied sectors.',
  	"cta_section_title" varchar DEFAULT 'Explore ARIFAC Programs',
  	"cta_section_description" varchar DEFAULT 'To learn more about ARIFAC''s structured initiatives and apply for participation in our upcoming programs.',
  	"cta_section_primary_button_label" varchar DEFAULT 'Explore Programs',
  	"cta_section_primary_button_link" varchar DEFAULT '/programmes',
  	"cta_section_secondary_button_label" varchar DEFAULT 'Membership',
  	"cta_section_secondary_button_link" varchar DEFAULT '/membership',
  	"important_note_title" varchar DEFAULT 'Important Note',
  	"important_note_text" varchar DEFAULT 'Access to specific consultations, working groups, and training programs may be subject to eligibility, participation criteria, and availability.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" ADD COLUMN "membership_sections_fee_schedule_label" varchar DEFAULT 'To view the schedule, click here';
  ALTER TABLE "_pages_v" ADD COLUMN "version_membership_sections_fee_schedule_label" varchar DEFAULT 'To view the schedule, click here';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_items_id" integer;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_page_about_section_features" ADD CONSTRAINT "gallery_page_about_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
  CREATE INDEX "gallery_items_updated_at_idx" ON "gallery_items" USING btree ("updated_at");
  CREATE INDEX "gallery_items_created_at_idx" ON "gallery_items" USING btree ("created_at");
  CREATE INDEX "gallery_page_about_section_features_order_idx" ON "gallery_page_about_section_features" USING btree ("_order");
  CREATE INDEX "gallery_page_about_section_features_parent_id_idx" ON "gallery_page_about_section_features" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_items_fk" FOREIGN KEY ("gallery_items_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_gallery_items_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_items_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page_about_section_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gallery_items" CASCADE;
  DROP TABLE "gallery_page_about_section_features" CASCADE;
  DROP TABLE "gallery_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_items_fk";
  
  DROP INDEX "payload_locked_documents_rels_gallery_items_id_idx";
  ALTER TABLE "pages" DROP COLUMN "membership_sections_fee_schedule_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_membership_sections_fee_schedule_label";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_items_id";
  DROP TYPE "public"."enum_gallery_items_category";`)
}
