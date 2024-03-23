CREATE TABLE IF NOT EXISTS "country" (
	"numeric" numeric PRIMARY KEY NOT NULL,
	"en_name" varchar(200) NOT NULL,
	"alpha2_code" varchar(2) NOT NULL,
	"alpha3_code" varchar(3) NOT NULL
);
