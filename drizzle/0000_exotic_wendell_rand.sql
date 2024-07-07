DO $$ BEGIN
 CREATE TYPE "public"."Role" AS ENUM('Owner', 'Editor', 'Viewer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meow-weight-tracker_eating_history" (
	"EntryID" serial PRIMARY KEY NOT NULL,
	"PetID" integer,
	"Date" date,
	"CreationTime" timestamp,
	"FeedingTime" timestamp,
	"Food" varchar,
	"Quantity" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meow-weight-tracker_pet_people" (
	"UserID" varchar,
	"PetID" integer,
	"CreationTime" timestamp,
	"UpdatedTime" timestamp,
	"Role" "Role",
	CONSTRAINT "meow-weight-tracker_pet_people_UserID_PetID_pk" PRIMARY KEY("UserID","PetID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meow-weight-tracker_pets" (
	"PetID" serial PRIMARY KEY NOT NULL,
	"Species" varchar,
	"Gender" varchar,
	"Name" varchar,
	"Age" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meow-weight-tracker_users" (
	"UserID" varchar(256) PRIMARY KEY NOT NULL,
	"CreationTime" timestamp,
	"UpdatedTime" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meow-weight-tracker_weight_history" (
	"RecordID" serial PRIMARY KEY NOT NULL,
	"PetID" integer,
	"CreationTime" timestamp,
	"WeightTime" timestamp,
	"Weight" numeric
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meow-weight-tracker_eating_history" ADD CONSTRAINT "meow-weight-tracker_eating_history_PetID_meow-weight-tracker_pets_PetID_fk" FOREIGN KEY ("PetID") REFERENCES "public"."meow-weight-tracker_pets"("PetID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meow-weight-tracker_pet_people" ADD CONSTRAINT "meow-weight-tracker_pet_people_UserID_meow-weight-tracker_users_UserID_fk" FOREIGN KEY ("UserID") REFERENCES "public"."meow-weight-tracker_users"("UserID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meow-weight-tracker_pet_people" ADD CONSTRAINT "meow-weight-tracker_pet_people_PetID_meow-weight-tracker_pets_PetID_fk" FOREIGN KEY ("PetID") REFERENCES "public"."meow-weight-tracker_pets"("PetID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meow-weight-tracker_weight_history" ADD CONSTRAINT "meow-weight-tracker_weight_history_PetID_meow-weight-tracker_pets_PetID_fk" FOREIGN KEY ("PetID") REFERENCES "public"."meow-weight-tracker_pets"("PetID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "eating_history_pet_index" ON "meow-weight-tracker_eating_history" ("PetID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pet_people_user_id_index" ON "meow-weight-tracker_pet_people" ("UserID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pet_people_pet_id_index" ON "meow-weight-tracker_pet_people" ("PetID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "meow-weight-tracker_users" ("UserID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "weight_history_pet_index" ON "meow-weight-tracker_weight_history" ("PetID");