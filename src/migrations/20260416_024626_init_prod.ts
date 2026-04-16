import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('simple', 'home', 'about', 'contact', 'membership', 'learners', 'contributor', 'certifications', 'updates');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('simple', 'home', 'about', 'contact', 'membership', 'learners', 'contributor', 'certifications', 'updates');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_regulatory_updates_category" AS ENUM('aml-cft', 'kyc-cdd', 'reporting', 'digital-onboarding', 'fraud-cyber', 'sanctions', 'compliance-governance');
  CREATE TYPE "public"."enum_regulatory_updates_issuing_body" AS ENUM('rbi', 'fiu-ind', 'sebi', 'irdai');
  CREATE TYPE "public"."enum_regulatory_updates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__regulatory_updates_v_version_category" AS ENUM('aml-cft', 'kyc-cdd', 'reporting', 'digital-onboarding', 'fraud-cyber', 'sanctions', 'compliance-governance');
  CREATE TYPE "public"."enum__regulatory_updates_v_version_issuing_body" AS ENUM('rbi', 'fiu-ind', 'sebi', 'irdai');
  CREATE TYPE "public"."enum__regulatory_updates_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_certifications_category" AS ENUM('Foundation', 'Professional', 'Specialist', 'Strategic');
  CREATE TYPE "public"."enum_certifications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certifications_v_version_category" AS ENUM('Foundation', 'Professional', 'Specialist', 'Strategic');
  CREATE TYPE "public"."enum__certifications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_programmes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programmes_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar,
  	"heading_highlight" varchar,
  	"heading_trail" varchar,
  	"description" varchar,
  	"primary_button_label" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_link" varchar,
  	"side_card_strategic_alignment_text" varchar,
  	"side_card_industry_led_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capability_matrix_mandates" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_ref" varchar
  );
  
  CREATE TABLE "pages_blocks_capability_matrix" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"section_heading_highlight" varchar,
  	"section_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_regulatory_dashboard" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_eyebrow" varchar DEFAULT 'Regulatory Intelligence',
  	"section_heading" varchar,
  	"section_description" varchar,
  	"cta_text" varchar DEFAULT 'Access Full Archive',
  	"cta_link" varchar DEFAULT '/regulatory-updates',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_programs_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"description" varchar,
  	"link" varchar,
  	"image" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_eyebrow" varchar DEFAULT 'Capability Building',
  	"section_heading" varchar,
  	"section_description" varchar,
  	"view_all_text" varchar DEFAULT 'View Certifications',
  	"view_all_link" varchar DEFAULT '/certifications',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"primary_button_label" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_partnerships" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Partnerships',
  	"heading" varchar,
  	"description" varchar,
  	"guidance_card_label" varchar DEFAULT 'Strategic Guidance',
  	"guidance_card_title" varchar,
  	"guidance_card_logo_url" varchar,
  	"disclaimer" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_why_section_threats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_why_section_aligned_with_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_what_section_focus_areas_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_what_section_focus_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "pages_who_section_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"subtitle" varchar
  );
  
  CREATE TABLE "pages_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar
  );
  
  CREATE TABLE "pages_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_validity_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_fee_tables_turnover_based" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tier" varchar,
  	"fee" varchar
  );
  
  CREATE TABLE "pages_fee_tables_aum_based" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tier" varchar,
  	"fee" varchar
  );
  
  CREATE TABLE "pages_access_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_expertise_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_why_contribute_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_pathway_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"page_type" "enum_pages_page_type" DEFAULT 'simple',
  	"banner_label" varchar,
  	"banner_title" varchar,
  	"banner_description" varchar,
  	"body" jsonb,
  	"why_section_eyebrow" varchar DEFAULT 'The Challenge',
  	"why_section_heading" varchar DEFAULT 'Why ARIFAC',
  	"why_section_description" varchar,
  	"why_section_aligned_with_description" varchar,
  	"what_section_eyebrow" varchar DEFAULT 'Operational Focus',
  	"what_section_heading" varchar DEFAULT 'What ARIFAC Does',
  	"what_section_description" varchar,
  	"who_section_eyebrow" varchar DEFAULT 'Membership',
  	"who_section_heading" varchar DEFAULT 'Who Should Engage',
  	"who_section_description" varchar,
  	"who_section_cta_label" varchar DEFAULT 'Explore Membership',
  	"who_section_cta_link" varchar DEFAULT '/membership',
  	"membership_intro_subheading" varchar,
  	"membership_intro_description" varchar,
  	"membership_cta_label" varchar,
  	"membership_cta_link" varchar,
  	"learners_cta_heading" varchar,
  	"learners_cta_description" varchar,
  	"learners_cta_button_label" varchar,
  	"learners_cta_button_link" varchar,
  	"why_contribute_heading" varchar DEFAULT 'Why Contribute to ARIFAC?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"heading" varchar,
  	"heading_highlight" varchar,
  	"heading_trail" varchar,
  	"description" varchar,
  	"primary_button_label" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_link" varchar,
  	"side_card_strategic_alignment_text" varchar,
  	"side_card_industry_led_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_matrix_mandates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_ref" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_matrix" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"section_heading_highlight" varchar,
  	"section_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_regulatory_dashboard" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_eyebrow" varchar DEFAULT 'Regulatory Intelligence',
  	"section_heading" varchar,
  	"section_description" varchar,
  	"cta_text" varchar DEFAULT 'Access Full Archive',
  	"cta_link" varchar DEFAULT '/regulatory-updates',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_programs_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"description" varchar,
  	"link" varchar,
  	"image" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_eyebrow" varchar DEFAULT 'Capability Building',
  	"section_heading" varchar,
  	"section_description" varchar,
  	"view_all_text" varchar DEFAULT 'View Certifications',
  	"view_all_link" varchar DEFAULT '/certifications',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"primary_button_label" varchar,
  	"primary_button_link" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_partnerships" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Partnerships',
  	"heading" varchar,
  	"description" varchar,
  	"guidance_card_label" varchar DEFAULT 'Strategic Guidance',
  	"guidance_card_title" varchar,
  	"guidance_card_logo_url" varchar,
  	"disclaimer" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_why_section_threats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_why_section_aligned_with_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_what_section_focus_areas_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_what_section_focus_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_who_section_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_validity_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_fee_tables_turnover_based" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tier" varchar,
  	"fee" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_fee_tables_aum_based" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tier" varchar,
  	"fee" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_access_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_expertise_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_why_contribute_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_pathway_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_page_type" "enum__pages_v_version_page_type" DEFAULT 'simple',
  	"version_banner_label" varchar,
  	"version_banner_title" varchar,
  	"version_banner_description" varchar,
  	"version_body" jsonb,
  	"version_why_section_eyebrow" varchar DEFAULT 'The Challenge',
  	"version_why_section_heading" varchar DEFAULT 'Why ARIFAC',
  	"version_why_section_description" varchar,
  	"version_why_section_aligned_with_description" varchar,
  	"version_what_section_eyebrow" varchar DEFAULT 'Operational Focus',
  	"version_what_section_heading" varchar DEFAULT 'What ARIFAC Does',
  	"version_what_section_description" varchar,
  	"version_who_section_eyebrow" varchar DEFAULT 'Membership',
  	"version_who_section_heading" varchar DEFAULT 'Who Should Engage',
  	"version_who_section_description" varchar,
  	"version_who_section_cta_label" varchar DEFAULT 'Explore Membership',
  	"version_who_section_cta_link" varchar DEFAULT '/membership',
  	"version_membership_intro_subheading" varchar,
  	"version_membership_intro_description" varchar,
  	"version_membership_cta_label" varchar,
  	"version_membership_cta_link" varchar,
  	"version_learners_cta_heading" varchar,
  	"version_learners_cta_description" varchar,
  	"version_learners_cta_button_label" varchar,
  	"version_learners_cta_button_link" varchar,
  	"version_why_contribute_heading" varchar DEFAULT 'Why Contribute to ARIFAC?',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "regulatory_updates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" timestamp(3) with time zone,
  	"reference_number" varchar,
  	"category" "enum_regulatory_updates_category",
  	"issuing_body" "enum_regulatory_updates_issuing_body",
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_regulatory_updates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_regulatory_updates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_reference_number" varchar,
  	"version_category" "enum__regulatory_updates_v_version_category",
  	"version_issuing_body" "enum__regulatory_updates_v_version_issuing_body",
  	"version_link" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__regulatory_updates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "certifications_curriculum" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"level" varchar,
  	"focus" varchar,
  	"category" "enum_certifications_category",
  	"format" varchar,
  	"description" varchar,
  	"duration" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_certifications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_certifications_v_version_curriculum" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_certifications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_level" varchar,
  	"version_focus" varchar,
  	"version_category" "enum__certifications_v_version_category",
  	"version_format" varchar,
  	"version_description" varchar,
  	"version_duration" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__certifications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "news_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_news_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_text" varchar,
  	"version_published" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "legal_pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"contact_email" varchar,
  	"acknowledgment_heading" varchar,
  	"acknowledgment_body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_contact_email" varchar,
  	"version_acknowledgment_heading" varchar,
  	"version_acknowledgment_body" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "nodal_officers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"sector" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "training_leads_directory" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"designation" varchar,
  	"organization" varchar NOT NULL,
  	"specialization" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"regulatory_updates_id" integer,
  	"certifications_id" integer,
  	"news_items_id" integer,
  	"members_id" integer,
  	"legal_pages_id" integer,
  	"nodal_officers_id" integer,
  	"training_leads_directory_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programmes_engagement_formats_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "programmes_engagement_formats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "programmes_programme_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"type" varchar,
  	"date" varchar
  );
  
  CREATE TABLE "programmes_recent_consultations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"type" varchar,
  	"date" varchar
  );
  
  CREATE TABLE "programmes_annual_meetings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"date" varchar,
  	"location" varchar
  );
  
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_label" varchar DEFAULT 'Programmes',
  	"banner_title" varchar,
  	"banner_description" varchar,
  	"section_headings_engagement_strategy" varchar DEFAULT 'Engagement Strategy',
  	"section_headings_programme_schedule" varchar DEFAULT 'Programme Schedule',
  	"section_headings_recent_consultations" varchar DEFAULT 'Recent Consultations',
  	"section_headings_annual_meetings" varchar DEFAULT 'Annual Meetings & Regulatory Fora',
  	"_status" "enum_programmes_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_programmes_v_version_engagement_formats_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_engagement_formats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_programme_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"type" varchar,
  	"date" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_recent_consultations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"type" varchar,
  	"date" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_annual_meetings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"date" varchar,
  	"location" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_banner_label" varchar DEFAULT 'Programmes',
  	"version_banner_title" varchar,
  	"version_banner_description" varchar,
  	"version_section_headings_engagement_strategy" varchar DEFAULT 'Engagement Strategy',
  	"version_section_headings_programme_schedule" varchar DEFAULT 'Programme Schedule',
  	"version_section_headings_recent_consultations" varchar DEFAULT 'Recent Consultations',
  	"version_section_headings_annual_meetings" varchar DEFAULT 'Annual Meetings & Regulatory Fora',
  	"version__status" "enum__programmes_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "header_navigation_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"has_dropdown" boolean DEFAULT false,
  	"dropdown_label" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"member_portal_label" varchar DEFAULT 'Member',
  	"member_portal_url" varchar,
  	"learner_portal_label" varchar DEFAULT 'Learner',
  	"learner_portal_url" varchar,
  	"fiu_logo_link" varchar DEFAULT 'https://fiuindia.gov.in/',
  	"linkedin_url" varchar DEFAULT 'https://www.linkedin.com/company/arifac/',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_link_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_link_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"initiative_label" varchar DEFAULT 'An IAMAI Initiative',
  	"copyright_text" varchar DEFAULT 'ARIFAC | IAMAI. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_matrix_mandates" ADD CONSTRAINT "pages_blocks_capability_matrix_mandates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capability_matrix"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_matrix" ADD CONSTRAINT "pages_blocks_capability_matrix_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_regulatory_dashboard" ADD CONSTRAINT "pages_blocks_regulatory_dashboard_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_programs_programs" ADD CONSTRAINT "pages_blocks_featured_programs_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_programs" ADD CONSTRAINT "pages_blocks_featured_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partnerships" ADD CONSTRAINT "pages_blocks_partnerships_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_why_section_threats" ADD CONSTRAINT "pages_why_section_threats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_why_section_aligned_with_items" ADD CONSTRAINT "pages_why_section_aligned_with_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_what_section_focus_areas_points" ADD CONSTRAINT "pages_what_section_focus_areas_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_what_section_focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_what_section_focus_areas" ADD CONSTRAINT "pages_what_section_focus_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_who_section_audiences" ADD CONSTRAINT "pages_who_section_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_benefits_items" ADD CONSTRAINT "pages_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_benefits" ADD CONSTRAINT "pages_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_responsibilities" ADD CONSTRAINT "pages_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_validity_terms" ADD CONSTRAINT "pages_validity_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_fee_tables_turnover_based" ADD CONSTRAINT "pages_fee_tables_turnover_based_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_fee_tables_aum_based" ADD CONSTRAINT "pages_fee_tables_aum_based_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_access_items" ADD CONSTRAINT "pages_access_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_expertise_areas" ADD CONSTRAINT "pages_expertise_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_why_contribute_points" ADD CONSTRAINT "pages_why_contribute_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_pathway_tiers" ADD CONSTRAINT "pages_pathway_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_matrix_mandates" ADD CONSTRAINT "_pages_v_blocks_capability_matrix_mandates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capability_matrix"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_matrix" ADD CONSTRAINT "_pages_v_blocks_capability_matrix_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_regulatory_dashboard" ADD CONSTRAINT "_pages_v_blocks_regulatory_dashboard_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_programs_programs" ADD CONSTRAINT "_pages_v_blocks_featured_programs_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_programs" ADD CONSTRAINT "_pages_v_blocks_featured_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_partnerships" ADD CONSTRAINT "_pages_v_blocks_partnerships_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_section_threats" ADD CONSTRAINT "_pages_v_version_why_section_threats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_section_aligned_with_items" ADD CONSTRAINT "_pages_v_version_why_section_aligned_with_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_what_section_focus_areas_points" ADD CONSTRAINT "_pages_v_version_what_section_focus_areas_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_what_section_focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_what_section_focus_areas" ADD CONSTRAINT "_pages_v_version_what_section_focus_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_who_section_audiences" ADD CONSTRAINT "_pages_v_version_who_section_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_benefits_items" ADD CONSTRAINT "_pages_v_version_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_benefits" ADD CONSTRAINT "_pages_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_responsibilities" ADD CONSTRAINT "_pages_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_validity_terms" ADD CONSTRAINT "_pages_v_version_validity_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_fee_tables_turnover_based" ADD CONSTRAINT "_pages_v_version_fee_tables_turnover_based_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_fee_tables_aum_based" ADD CONSTRAINT "_pages_v_version_fee_tables_aum_based_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_access_items" ADD CONSTRAINT "_pages_v_version_access_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_expertise_areas" ADD CONSTRAINT "_pages_v_version_expertise_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_why_contribute_points" ADD CONSTRAINT "_pages_v_version_why_contribute_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_pathway_tiers" ADD CONSTRAINT "_pages_v_version_pathway_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_regulatory_updates_v" ADD CONSTRAINT "_regulatory_updates_v_parent_id_regulatory_updates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."regulatory_updates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_curriculum" ADD CONSTRAINT "certifications_curriculum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_version_curriculum" ADD CONSTRAINT "_certifications_v_version_curriculum_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_parent_id_certifications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_items_v" ADD CONSTRAINT "_news_items_v_parent_id_news_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_members_v" ADD CONSTRAINT "_members_v_parent_id_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages_sections" ADD CONSTRAINT "legal_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_sections" ADD CONSTRAINT "_legal_pages_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regulatory_updates_fk" FOREIGN KEY ("regulatory_updates_id") REFERENCES "public"."regulatory_updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_items_fk" FOREIGN KEY ("news_items_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_nodal_officers_fk" FOREIGN KEY ("nodal_officers_id") REFERENCES "public"."nodal_officers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_training_leads_directory_fk" FOREIGN KEY ("training_leads_directory_id") REFERENCES "public"."training_leads_directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_engagement_formats_points" ADD CONSTRAINT "programmes_engagement_formats_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes_engagement_formats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_engagement_formats" ADD CONSTRAINT "programmes_engagement_formats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_programme_schedule" ADD CONSTRAINT "programmes_programme_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_recent_consultations" ADD CONSTRAINT "programmes_recent_consultations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_annual_meetings" ADD CONSTRAINT "programmes_annual_meetings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_engagement_formats_points" ADD CONSTRAINT "_programmes_v_version_engagement_formats_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v_version_engagement_formats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_engagement_formats" ADD CONSTRAINT "_programmes_v_version_engagement_formats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_programme_schedule" ADD CONSTRAINT "_programmes_v_version_programme_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_recent_consultations" ADD CONSTRAINT "_programmes_v_version_recent_consultations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_annual_meetings" ADD CONSTRAINT "_programmes_v_version_annual_meetings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_dropdown_items" ADD CONSTRAINT "header_navigation_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_groups_links" ADD CONSTRAINT "footer_link_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_link_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_link_groups" ADD CONSTRAINT "footer_link_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_capability_matrix_mandates_order_idx" ON "pages_blocks_capability_matrix_mandates" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_matrix_mandates_parent_id_idx" ON "pages_blocks_capability_matrix_mandates" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_matrix_order_idx" ON "pages_blocks_capability_matrix" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_matrix_parent_id_idx" ON "pages_blocks_capability_matrix" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_matrix_path_idx" ON "pages_blocks_capability_matrix" USING btree ("_path");
  CREATE INDEX "pages_blocks_regulatory_dashboard_order_idx" ON "pages_blocks_regulatory_dashboard" USING btree ("_order");
  CREATE INDEX "pages_blocks_regulatory_dashboard_parent_id_idx" ON "pages_blocks_regulatory_dashboard" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_regulatory_dashboard_path_idx" ON "pages_blocks_regulatory_dashboard" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_programs_programs_order_idx" ON "pages_blocks_featured_programs_programs" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_programs_programs_parent_id_idx" ON "pages_blocks_featured_programs_programs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_programs_order_idx" ON "pages_blocks_featured_programs" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_programs_parent_id_idx" ON "pages_blocks_featured_programs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_programs_path_idx" ON "pages_blocks_featured_programs" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_partnerships_order_idx" ON "pages_blocks_partnerships" USING btree ("_order");
  CREATE INDEX "pages_blocks_partnerships_parent_id_idx" ON "pages_blocks_partnerships" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partnerships_path_idx" ON "pages_blocks_partnerships" USING btree ("_path");
  CREATE INDEX "pages_why_section_threats_order_idx" ON "pages_why_section_threats" USING btree ("_order");
  CREATE INDEX "pages_why_section_threats_parent_id_idx" ON "pages_why_section_threats" USING btree ("_parent_id");
  CREATE INDEX "pages_why_section_aligned_with_items_order_idx" ON "pages_why_section_aligned_with_items" USING btree ("_order");
  CREATE INDEX "pages_why_section_aligned_with_items_parent_id_idx" ON "pages_why_section_aligned_with_items" USING btree ("_parent_id");
  CREATE INDEX "pages_what_section_focus_areas_points_order_idx" ON "pages_what_section_focus_areas_points" USING btree ("_order");
  CREATE INDEX "pages_what_section_focus_areas_points_parent_id_idx" ON "pages_what_section_focus_areas_points" USING btree ("_parent_id");
  CREATE INDEX "pages_what_section_focus_areas_order_idx" ON "pages_what_section_focus_areas" USING btree ("_order");
  CREATE INDEX "pages_what_section_focus_areas_parent_id_idx" ON "pages_what_section_focus_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_who_section_audiences_order_idx" ON "pages_who_section_audiences" USING btree ("_order");
  CREATE INDEX "pages_who_section_audiences_parent_id_idx" ON "pages_who_section_audiences" USING btree ("_parent_id");
  CREATE INDEX "pages_benefits_items_order_idx" ON "pages_benefits_items" USING btree ("_order");
  CREATE INDEX "pages_benefits_items_parent_id_idx" ON "pages_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "pages_benefits_order_idx" ON "pages_benefits" USING btree ("_order");
  CREATE INDEX "pages_benefits_parent_id_idx" ON "pages_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_responsibilities_order_idx" ON "pages_responsibilities" USING btree ("_order");
  CREATE INDEX "pages_responsibilities_parent_id_idx" ON "pages_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "pages_validity_terms_order_idx" ON "pages_validity_terms" USING btree ("_order");
  CREATE INDEX "pages_validity_terms_parent_id_idx" ON "pages_validity_terms" USING btree ("_parent_id");
  CREATE INDEX "pages_fee_tables_turnover_based_order_idx" ON "pages_fee_tables_turnover_based" USING btree ("_order");
  CREATE INDEX "pages_fee_tables_turnover_based_parent_id_idx" ON "pages_fee_tables_turnover_based" USING btree ("_parent_id");
  CREATE INDEX "pages_fee_tables_aum_based_order_idx" ON "pages_fee_tables_aum_based" USING btree ("_order");
  CREATE INDEX "pages_fee_tables_aum_based_parent_id_idx" ON "pages_fee_tables_aum_based" USING btree ("_parent_id");
  CREATE INDEX "pages_access_items_order_idx" ON "pages_access_items" USING btree ("_order");
  CREATE INDEX "pages_access_items_parent_id_idx" ON "pages_access_items" USING btree ("_parent_id");
  CREATE INDEX "pages_expertise_areas_order_idx" ON "pages_expertise_areas" USING btree ("_order");
  CREATE INDEX "pages_expertise_areas_parent_id_idx" ON "pages_expertise_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_why_contribute_points_order_idx" ON "pages_why_contribute_points" USING btree ("_order");
  CREATE INDEX "pages_why_contribute_points_parent_id_idx" ON "pages_why_contribute_points" USING btree ("_parent_id");
  CREATE INDEX "pages_pathway_tiers_order_idx" ON "pages_pathway_tiers" USING btree ("_order");
  CREATE INDEX "pages_pathway_tiers_parent_id_idx" ON "pages_pathway_tiers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capability_matrix_mandates_order_idx" ON "_pages_v_blocks_capability_matrix_mandates" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_matrix_mandates_parent_id_idx" ON "_pages_v_blocks_capability_matrix_mandates" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_matrix_order_idx" ON "_pages_v_blocks_capability_matrix" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_matrix_parent_id_idx" ON "_pages_v_blocks_capability_matrix" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_matrix_path_idx" ON "_pages_v_blocks_capability_matrix" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_regulatory_dashboard_order_idx" ON "_pages_v_blocks_regulatory_dashboard" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_regulatory_dashboard_parent_id_idx" ON "_pages_v_blocks_regulatory_dashboard" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_regulatory_dashboard_path_idx" ON "_pages_v_blocks_regulatory_dashboard" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_programs_programs_order_idx" ON "_pages_v_blocks_featured_programs_programs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_programs_programs_parent_id_idx" ON "_pages_v_blocks_featured_programs_programs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_programs_order_idx" ON "_pages_v_blocks_featured_programs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_programs_parent_id_idx" ON "_pages_v_blocks_featured_programs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_programs_path_idx" ON "_pages_v_blocks_featured_programs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_partnerships_order_idx" ON "_pages_v_blocks_partnerships" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_partnerships_parent_id_idx" ON "_pages_v_blocks_partnerships" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_partnerships_path_idx" ON "_pages_v_blocks_partnerships" USING btree ("_path");
  CREATE INDEX "_pages_v_version_why_section_threats_order_idx" ON "_pages_v_version_why_section_threats" USING btree ("_order");
  CREATE INDEX "_pages_v_version_why_section_threats_parent_id_idx" ON "_pages_v_version_why_section_threats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_why_section_aligned_with_items_order_idx" ON "_pages_v_version_why_section_aligned_with_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_why_section_aligned_with_items_parent_id_idx" ON "_pages_v_version_why_section_aligned_with_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_what_section_focus_areas_points_order_idx" ON "_pages_v_version_what_section_focus_areas_points" USING btree ("_order");
  CREATE INDEX "_pages_v_version_what_section_focus_areas_points_parent_id_idx" ON "_pages_v_version_what_section_focus_areas_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_what_section_focus_areas_order_idx" ON "_pages_v_version_what_section_focus_areas" USING btree ("_order");
  CREATE INDEX "_pages_v_version_what_section_focus_areas_parent_id_idx" ON "_pages_v_version_what_section_focus_areas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_who_section_audiences_order_idx" ON "_pages_v_version_who_section_audiences" USING btree ("_order");
  CREATE INDEX "_pages_v_version_who_section_audiences_parent_id_idx" ON "_pages_v_version_who_section_audiences" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_benefits_items_order_idx" ON "_pages_v_version_benefits_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_benefits_items_parent_id_idx" ON "_pages_v_version_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_benefits_order_idx" ON "_pages_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_version_benefits_parent_id_idx" ON "_pages_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_responsibilities_order_idx" ON "_pages_v_version_responsibilities" USING btree ("_order");
  CREATE INDEX "_pages_v_version_responsibilities_parent_id_idx" ON "_pages_v_version_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_validity_terms_order_idx" ON "_pages_v_version_validity_terms" USING btree ("_order");
  CREATE INDEX "_pages_v_version_validity_terms_parent_id_idx" ON "_pages_v_version_validity_terms" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_fee_tables_turnover_based_order_idx" ON "_pages_v_version_fee_tables_turnover_based" USING btree ("_order");
  CREATE INDEX "_pages_v_version_fee_tables_turnover_based_parent_id_idx" ON "_pages_v_version_fee_tables_turnover_based" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_fee_tables_aum_based_order_idx" ON "_pages_v_version_fee_tables_aum_based" USING btree ("_order");
  CREATE INDEX "_pages_v_version_fee_tables_aum_based_parent_id_idx" ON "_pages_v_version_fee_tables_aum_based" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_access_items_order_idx" ON "_pages_v_version_access_items" USING btree ("_order");
  CREATE INDEX "_pages_v_version_access_items_parent_id_idx" ON "_pages_v_version_access_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_expertise_areas_order_idx" ON "_pages_v_version_expertise_areas" USING btree ("_order");
  CREATE INDEX "_pages_v_version_expertise_areas_parent_id_idx" ON "_pages_v_version_expertise_areas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_why_contribute_points_order_idx" ON "_pages_v_version_why_contribute_points" USING btree ("_order");
  CREATE INDEX "_pages_v_version_why_contribute_points_parent_id_idx" ON "_pages_v_version_why_contribute_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_pathway_tiers_order_idx" ON "_pages_v_version_pathway_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_version_pathway_tiers_parent_id_idx" ON "_pages_v_version_pathway_tiers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "regulatory_updates_updated_at_idx" ON "regulatory_updates" USING btree ("updated_at");
  CREATE INDEX "regulatory_updates_created_at_idx" ON "regulatory_updates" USING btree ("created_at");
  CREATE INDEX "regulatory_updates__status_idx" ON "regulatory_updates" USING btree ("_status");
  CREATE INDEX "_regulatory_updates_v_parent_idx" ON "_regulatory_updates_v" USING btree ("parent_id");
  CREATE INDEX "_regulatory_updates_v_version_version_updated_at_idx" ON "_regulatory_updates_v" USING btree ("version_updated_at");
  CREATE INDEX "_regulatory_updates_v_version_version_created_at_idx" ON "_regulatory_updates_v" USING btree ("version_created_at");
  CREATE INDEX "_regulatory_updates_v_version_version__status_idx" ON "_regulatory_updates_v" USING btree ("version__status");
  CREATE INDEX "_regulatory_updates_v_created_at_idx" ON "_regulatory_updates_v" USING btree ("created_at");
  CREATE INDEX "_regulatory_updates_v_updated_at_idx" ON "_regulatory_updates_v" USING btree ("updated_at");
  CREATE INDEX "_regulatory_updates_v_latest_idx" ON "_regulatory_updates_v" USING btree ("latest");
  CREATE INDEX "certifications_curriculum_order_idx" ON "certifications_curriculum" USING btree ("_order");
  CREATE INDEX "certifications_curriculum_parent_id_idx" ON "certifications_curriculum" USING btree ("_parent_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE INDEX "certifications__status_idx" ON "certifications" USING btree ("_status");
  CREATE INDEX "_certifications_v_version_curriculum_order_idx" ON "_certifications_v_version_curriculum" USING btree ("_order");
  CREATE INDEX "_certifications_v_version_curriculum_parent_id_idx" ON "_certifications_v_version_curriculum" USING btree ("_parent_id");
  CREATE INDEX "_certifications_v_parent_idx" ON "_certifications_v" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_version_version_updated_at_idx" ON "_certifications_v" USING btree ("version_updated_at");
  CREATE INDEX "_certifications_v_version_version_created_at_idx" ON "_certifications_v" USING btree ("version_created_at");
  CREATE INDEX "_certifications_v_version_version__status_idx" ON "_certifications_v" USING btree ("version__status");
  CREATE INDEX "_certifications_v_created_at_idx" ON "_certifications_v" USING btree ("created_at");
  CREATE INDEX "_certifications_v_updated_at_idx" ON "_certifications_v" USING btree ("updated_at");
  CREATE INDEX "_certifications_v_latest_idx" ON "_certifications_v" USING btree ("latest");
  CREATE INDEX "news_items_updated_at_idx" ON "news_items" USING btree ("updated_at");
  CREATE INDEX "news_items_created_at_idx" ON "news_items" USING btree ("created_at");
  CREATE INDEX "news_items__status_idx" ON "news_items" USING btree ("_status");
  CREATE INDEX "_news_items_v_parent_idx" ON "_news_items_v" USING btree ("parent_id");
  CREATE INDEX "_news_items_v_version_version_updated_at_idx" ON "_news_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_items_v_version_version_created_at_idx" ON "_news_items_v" USING btree ("version_created_at");
  CREATE INDEX "_news_items_v_version_version__status_idx" ON "_news_items_v" USING btree ("version__status");
  CREATE INDEX "_news_items_v_created_at_idx" ON "_news_items_v" USING btree ("created_at");
  CREATE INDEX "_news_items_v_updated_at_idx" ON "_news_items_v" USING btree ("updated_at");
  CREATE INDEX "_news_items_v_latest_idx" ON "_news_items_v" USING btree ("latest");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE INDEX "members__status_idx" ON "members" USING btree ("_status");
  CREATE INDEX "_members_v_parent_idx" ON "_members_v" USING btree ("parent_id");
  CREATE INDEX "_members_v_version_version_updated_at_idx" ON "_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_members_v_version_version_created_at_idx" ON "_members_v" USING btree ("version_created_at");
  CREATE INDEX "_members_v_version_version__status_idx" ON "_members_v" USING btree ("version__status");
  CREATE INDEX "_members_v_created_at_idx" ON "_members_v" USING btree ("created_at");
  CREATE INDEX "_members_v_updated_at_idx" ON "_members_v" USING btree ("updated_at");
  CREATE INDEX "_members_v_latest_idx" ON "_members_v" USING btree ("latest");
  CREATE INDEX "legal_pages_sections_order_idx" ON "legal_pages_sections" USING btree ("_order");
  CREATE INDEX "legal_pages_sections_parent_id_idx" ON "legal_pages_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_version_sections_order_idx" ON "_legal_pages_v_version_sections" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_sections_parent_id_idx" ON "_legal_pages_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE INDEX "nodal_officers_updated_at_idx" ON "nodal_officers" USING btree ("updated_at");
  CREATE INDEX "nodal_officers_created_at_idx" ON "nodal_officers" USING btree ("created_at");
  CREATE INDEX "training_leads_directory_updated_at_idx" ON "training_leads_directory" USING btree ("updated_at");
  CREATE INDEX "training_leads_directory_created_at_idx" ON "training_leads_directory" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_regulatory_updates_id_idx" ON "payload_locked_documents_rels" USING btree ("regulatory_updates_id");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX "payload_locked_documents_rels_news_items_id_idx" ON "payload_locked_documents_rels" USING btree ("news_items_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_nodal_officers_id_idx" ON "payload_locked_documents_rels" USING btree ("nodal_officers_id");
  CREATE INDEX "payload_locked_documents_rels_training_leads_directory_i_idx" ON "payload_locked_documents_rels" USING btree ("training_leads_directory_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "programmes_engagement_formats_points_order_idx" ON "programmes_engagement_formats_points" USING btree ("_order");
  CREATE INDEX "programmes_engagement_formats_points_parent_id_idx" ON "programmes_engagement_formats_points" USING btree ("_parent_id");
  CREATE INDEX "programmes_engagement_formats_order_idx" ON "programmes_engagement_formats" USING btree ("_order");
  CREATE INDEX "programmes_engagement_formats_parent_id_idx" ON "programmes_engagement_formats" USING btree ("_parent_id");
  CREATE INDEX "programmes_programme_schedule_order_idx" ON "programmes_programme_schedule" USING btree ("_order");
  CREATE INDEX "programmes_programme_schedule_parent_id_idx" ON "programmes_programme_schedule" USING btree ("_parent_id");
  CREATE INDEX "programmes_recent_consultations_order_idx" ON "programmes_recent_consultations" USING btree ("_order");
  CREATE INDEX "programmes_recent_consultations_parent_id_idx" ON "programmes_recent_consultations" USING btree ("_parent_id");
  CREATE INDEX "programmes_annual_meetings_order_idx" ON "programmes_annual_meetings" USING btree ("_order");
  CREATE INDEX "programmes_annual_meetings_parent_id_idx" ON "programmes_annual_meetings" USING btree ("_parent_id");
  CREATE INDEX "programmes__status_idx" ON "programmes" USING btree ("_status");
  CREATE INDEX "_programmes_v_version_engagement_formats_points_order_idx" ON "_programmes_v_version_engagement_formats_points" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_engagement_formats_points_parent_id_idx" ON "_programmes_v_version_engagement_formats_points" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_engagement_formats_order_idx" ON "_programmes_v_version_engagement_formats" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_engagement_formats_parent_id_idx" ON "_programmes_v_version_engagement_formats" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_programme_schedule_order_idx" ON "_programmes_v_version_programme_schedule" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_programme_schedule_parent_id_idx" ON "_programmes_v_version_programme_schedule" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_recent_consultations_order_idx" ON "_programmes_v_version_recent_consultations" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_recent_consultations_parent_id_idx" ON "_programmes_v_version_recent_consultations" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_annual_meetings_order_idx" ON "_programmes_v_version_annual_meetings" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_annual_meetings_parent_id_idx" ON "_programmes_v_version_annual_meetings" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_version__status_idx" ON "_programmes_v" USING btree ("version__status");
  CREATE INDEX "_programmes_v_created_at_idx" ON "_programmes_v" USING btree ("created_at");
  CREATE INDEX "_programmes_v_updated_at_idx" ON "_programmes_v" USING btree ("updated_at");
  CREATE INDEX "_programmes_v_latest_idx" ON "_programmes_v" USING btree ("latest");
  CREATE INDEX "header_navigation_dropdown_items_order_idx" ON "header_navigation_dropdown_items" USING btree ("_order");
  CREATE INDEX "header_navigation_dropdown_items_parent_id_idx" ON "header_navigation_dropdown_items" USING btree ("_parent_id");
  CREATE INDEX "header_navigation_order_idx" ON "header_navigation" USING btree ("_order");
  CREATE INDEX "header_navigation_parent_id_idx" ON "header_navigation" USING btree ("_parent_id");
  CREATE INDEX "footer_link_groups_links_order_idx" ON "footer_link_groups_links" USING btree ("_order");
  CREATE INDEX "footer_link_groups_links_parent_id_idx" ON "footer_link_groups_links" USING btree ("_parent_id");
  CREATE INDEX "footer_link_groups_order_idx" ON "footer_link_groups" USING btree ("_order");
  CREATE INDEX "footer_link_groups_parent_id_idx" ON "footer_link_groups" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_capability_matrix_mandates" CASCADE;
  DROP TABLE "pages_blocks_capability_matrix" CASCADE;
  DROP TABLE "pages_blocks_regulatory_dashboard" CASCADE;
  DROP TABLE "pages_blocks_featured_programs_programs" CASCADE;
  DROP TABLE "pages_blocks_featured_programs" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_partnerships" CASCADE;
  DROP TABLE "pages_why_section_threats" CASCADE;
  DROP TABLE "pages_why_section_aligned_with_items" CASCADE;
  DROP TABLE "pages_what_section_focus_areas_points" CASCADE;
  DROP TABLE "pages_what_section_focus_areas" CASCADE;
  DROP TABLE "pages_who_section_audiences" CASCADE;
  DROP TABLE "pages_benefits_items" CASCADE;
  DROP TABLE "pages_benefits" CASCADE;
  DROP TABLE "pages_responsibilities" CASCADE;
  DROP TABLE "pages_validity_terms" CASCADE;
  DROP TABLE "pages_fee_tables_turnover_based" CASCADE;
  DROP TABLE "pages_fee_tables_aum_based" CASCADE;
  DROP TABLE "pages_access_items" CASCADE;
  DROP TABLE "pages_expertise_areas" CASCADE;
  DROP TABLE "pages_why_contribute_points" CASCADE;
  DROP TABLE "pages_pathway_tiers" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_matrix_mandates" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_matrix" CASCADE;
  DROP TABLE "_pages_v_blocks_regulatory_dashboard" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_programs_programs" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_programs" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_partnerships" CASCADE;
  DROP TABLE "_pages_v_version_why_section_threats" CASCADE;
  DROP TABLE "_pages_v_version_why_section_aligned_with_items" CASCADE;
  DROP TABLE "_pages_v_version_what_section_focus_areas_points" CASCADE;
  DROP TABLE "_pages_v_version_what_section_focus_areas" CASCADE;
  DROP TABLE "_pages_v_version_who_section_audiences" CASCADE;
  DROP TABLE "_pages_v_version_benefits_items" CASCADE;
  DROP TABLE "_pages_v_version_benefits" CASCADE;
  DROP TABLE "_pages_v_version_responsibilities" CASCADE;
  DROP TABLE "_pages_v_version_validity_terms" CASCADE;
  DROP TABLE "_pages_v_version_fee_tables_turnover_based" CASCADE;
  DROP TABLE "_pages_v_version_fee_tables_aum_based" CASCADE;
  DROP TABLE "_pages_v_version_access_items" CASCADE;
  DROP TABLE "_pages_v_version_expertise_areas" CASCADE;
  DROP TABLE "_pages_v_version_why_contribute_points" CASCADE;
  DROP TABLE "_pages_v_version_pathway_tiers" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "regulatory_updates" CASCADE;
  DROP TABLE "_regulatory_updates_v" CASCADE;
  DROP TABLE "certifications_curriculum" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "_certifications_v_version_curriculum" CASCADE;
  DROP TABLE "_certifications_v" CASCADE;
  DROP TABLE "news_items" CASCADE;
  DROP TABLE "_news_items_v" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "_members_v" CASCADE;
  DROP TABLE "legal_pages_sections" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v_version_sections" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "nodal_officers" CASCADE;
  DROP TABLE "training_leads_directory" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "programmes_engagement_formats_points" CASCADE;
  DROP TABLE "programmes_engagement_formats" CASCADE;
  DROP TABLE "programmes_programme_schedule" CASCADE;
  DROP TABLE "programmes_recent_consultations" CASCADE;
  DROP TABLE "programmes_annual_meetings" CASCADE;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "_programmes_v_version_engagement_formats_points" CASCADE;
  DROP TABLE "_programmes_v_version_engagement_formats" CASCADE;
  DROP TABLE "_programmes_v_version_programme_schedule" CASCADE;
  DROP TABLE "_programmes_v_version_recent_consultations" CASCADE;
  DROP TABLE "_programmes_v_version_annual_meetings" CASCADE;
  DROP TABLE "_programmes_v" CASCADE;
  DROP TABLE "header_navigation_dropdown_items" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_link_groups_links" CASCADE;
  DROP TABLE "footer_link_groups" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_regulatory_updates_category";
  DROP TYPE "public"."enum_regulatory_updates_issuing_body";
  DROP TYPE "public"."enum_regulatory_updates_status";
  DROP TYPE "public"."enum__regulatory_updates_v_version_category";
  DROP TYPE "public"."enum__regulatory_updates_v_version_issuing_body";
  DROP TYPE "public"."enum__regulatory_updates_v_version_status";
  DROP TYPE "public"."enum_certifications_category";
  DROP TYPE "public"."enum_certifications_status";
  DROP TYPE "public"."enum__certifications_v_version_category";
  DROP TYPE "public"."enum__certifications_v_version_status";
  DROP TYPE "public"."enum_news_items_status";
  DROP TYPE "public"."enum__news_items_v_version_status";
  DROP TYPE "public"."enum_members_status";
  DROP TYPE "public"."enum__members_v_version_status";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum_programmes_status";
  DROP TYPE "public"."enum__programmes_v_version_status";`)
}
