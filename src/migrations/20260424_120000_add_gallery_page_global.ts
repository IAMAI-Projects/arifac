import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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

   ALTER TABLE "gallery_page_about_section_features"
    ADD CONSTRAINT "gallery_page_about_section_features_parent_id_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_page"("id")
    ON DELETE cascade ON UPDATE no action;

   CREATE INDEX "gallery_page_about_section_features_order_idx"
    ON "gallery_page_about_section_features" USING btree ("_order");
   CREATE INDEX "gallery_page_about_section_features_parent_id_idx"
    ON "gallery_page_about_section_features" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "gallery_page_about_section_features" CASCADE;
   DROP TABLE "gallery_page" CASCADE;
  `)
}
