ALTER TABLE "radio" RENAME TO "radios";--> statement-breakpoint
ALTER TABLE "radios" DROP CONSTRAINT "radio_slug_unique";--> statement-breakpoint
ALTER TABLE "radios_genres" DROP CONSTRAINT "radios_genres_radio_id_radio_id_fk";
--> statement-breakpoint
ALTER TABLE "radios" DROP CONSTRAINT "radio_organization_id_organization_id_fk";
--> statement-breakpoint
ALTER TABLE "radios" DROP CONSTRAINT "radio_country_numeric_country_numeric_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "radios_genres" ADD CONSTRAINT "radios_genres_radio_id_radios_id_fk" FOREIGN KEY ("radio_id") REFERENCES "radios"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "radios" ADD CONSTRAINT "radios_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "radios" ADD CONSTRAINT "radios_country_numeric_country_numeric_fk" FOREIGN KEY ("country_numeric") REFERENCES "country"("numeric") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "radios" ADD CONSTRAINT "radios_slug_unique" UNIQUE("slug");