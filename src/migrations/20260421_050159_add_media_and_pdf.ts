import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "regulatory_updates" ADD COLUMN "pdf_id" integer;
  ALTER TABLE "_regulatory_updates_v" ADD COLUMN "version_pdf_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  ALTER TABLE "regulatory_updates" ADD CONSTRAINT "regulatory_updates_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_regulatory_updates_v" ADD CONSTRAINT "_regulatory_updates_v_version_pdf_id_media_id_fk" FOREIGN KEY ("version_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "regulatory_updates_pdf_idx" ON "regulatory_updates" USING btree ("pdf_id");
  CREATE INDEX "_regulatory_updates_v_version_version_pdf_idx" ON "_regulatory_updates_v" USING btree ("version_pdf_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media" CASCADE;
  ALTER TABLE "regulatory_updates" DROP CONSTRAINT "regulatory_updates_pdf_id_media_id_fk";
  
  ALTER TABLE "_regulatory_updates_v" DROP CONSTRAINT "_regulatory_updates_v_version_pdf_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  DROP INDEX "regulatory_updates_pdf_idx";
  DROP INDEX "_regulatory_updates_v_version_version_pdf_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  ALTER TABLE "regulatory_updates" DROP COLUMN "pdf_id";
  ALTER TABLE "_regulatory_updates_v" DROP COLUMN "version_pdf_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";`)
}
