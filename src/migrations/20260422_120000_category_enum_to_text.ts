import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certifications" ALTER COLUMN "category" TYPE varchar USING "category"::text;
  ALTER TABLE "_certifications_v" ALTER COLUMN "version_category" TYPE varchar USING "version_category"::text;
  DROP TYPE "public"."enum_certifications_category";
  DROP TYPE "public"."enum__certifications_v_version_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_certifications_category" AS ENUM('Foundation', 'Professional', 'Specialist', 'Strategic');
  CREATE TYPE "public"."enum__certifications_v_version_category" AS ENUM('Foundation', 'Professional', 'Specialist', 'Strategic');
  ALTER TABLE "certifications" ALTER COLUMN "category" TYPE "enum_certifications_category" USING "category"::"enum_certifications_category";
  ALTER TABLE "_certifications_v" ALTER COLUMN "version_category" TYPE "enum__certifications_v_version_category" USING "version_category"::"enum__certifications_v_version_category";`)
}
