ALTER TABLE "radio" ADD COLUMN "country_id" numeric;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "radio" ADD CONSTRAINT "radio_country_id_country_numeric_fk" FOREIGN KEY ("country_id") REFERENCES "country"("numeric") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
