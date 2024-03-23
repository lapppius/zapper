ALTER TABLE "radio" RENAME COLUMN "wikidataID" TO "wikidata_id";--> statement-breakpoint
ALTER TABLE "radio" RENAME COLUMN "country_id" TO "country_numeric";--> statement-breakpoint
ALTER TABLE "radio" DROP CONSTRAINT "radio_country_id_country_numeric_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "radio" ADD CONSTRAINT "radio_country_numeric_country_numeric_fk" FOREIGN KEY ("country_numeric") REFERENCES "country"("numeric") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
