CREATE TABLE IF NOT EXISTS "meow-weight-tracker_pet_food" (
	"FoodID" serial PRIMARY KEY NOT NULL,
	"Name" varchar(256),
	"Brand" varchar(256),
	"CaloriesPerGram" numeric,
	"CaloriesPerLiter" numeric,
	"ProteinPercent" numeric,
	"FatPercent" numeric,
	"CarbsPercent" numeric,
	"Notes" varchar(1024),
	"CreatedTime" timestamp,
	"UpdatedTime" timestamp
);
--> statement-breakpoint
ALTER TABLE "meow-weight-tracker_eating_history" ADD COLUMN "FoodID" integer;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pet_food_name_index" ON "meow-weight-tracker_pet_food" ("Name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meow-weight-tracker_eating_history" ADD CONSTRAINT "meow-weight-tracker_eating_history_FoodID_meow-weight-tracker_pet_food_FoodID_fk" FOREIGN KEY ("FoodID") REFERENCES "public"."meow-weight-tracker_pet_food"("FoodID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "meow-weight-tracker_eating_history" DROP COLUMN IF EXISTS "Food";