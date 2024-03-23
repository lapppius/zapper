CREATE TABLE IF NOT EXISTS "organization" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"legal_name" varchar(100),
	"website" varchar(100),
	"country_id" numeric,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "radio" ADD COLUMN "organization_id" smallint;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "radio" ADD CONSTRAINT "radio_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization" ADD CONSTRAINT "organization_country_id_country_numeric_fk" FOREIGN KEY ("country_id") REFERENCES "country"("numeric") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
