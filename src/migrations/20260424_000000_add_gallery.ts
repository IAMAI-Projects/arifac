import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_items_category" AS ENUM('industry-consultations', 'training-capacity-building', 'working-groups', 'flagship-programs');

   CREATE TABLE "gallery_items" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "image_id" integer,
    "category" "enum_gallery_items_category" DEFAULT 'industry-consultations' NOT NULL,
    "description" varchar,
    "order" numeric DEFAULT 100,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
   CREATE INDEX "gallery_items_created_at_idx" ON "gallery_items" USING btree ("created_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "gallery_items" CASCADE;
   DROP TYPE "public"."enum_gallery_items_category";
  `)
}
