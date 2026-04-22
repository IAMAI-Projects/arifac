import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_certifications_launch_status" AS ENUM('live', 'coming-soon');
  CREATE TYPE "public"."enum__certifications_v_version_launch_status" AS ENUM('live', 'coming-soon');
  ALTER TABLE "certifications" ADD COLUMN "launch_status" "enum_certifications_launch_status" DEFAULT 'coming-soon';
  ALTER TABLE "certifications" ADD COLUMN "order" numeric DEFAULT 100;
  ALTER TABLE "_certifications_v" ADD COLUMN "version_launch_status" "enum__certifications_v_version_launch_status" DEFAULT 'coming-soon';
  ALTER TABLE "_certifications_v" ADD COLUMN "version_order" numeric DEFAULT 100;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certifications" DROP COLUMN "launch_status";
  ALTER TABLE "certifications" DROP COLUMN "order";
  ALTER TABLE "_certifications_v" DROP COLUMN "version_launch_status";
  ALTER TABLE "_certifications_v" DROP COLUMN "version_order";
  DROP TYPE "public"."enum_certifications_launch_status";
  DROP TYPE "public"."enum__certifications_v_version_launch_status";`)
}
