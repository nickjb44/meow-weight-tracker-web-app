// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    date, decimal,
    index, integer,
    pgTableCreator,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `meow-weight-tracker_${name}`);

export const Pets = createTable(
    "pets",
    {
        PetID: serial("PetID").primaryKey(),
        Species: varchar('Species'),
        Gender: varchar('Gender'),
        Name: varchar('Name'),
        Age: integer('Age'),
    }
);

export const EatingHistory = createTable(
    "eating_history",
    {
        EntryID: serial("EntryID").primaryKey(),
        PetID: integer('PetID').references(() => Pets.PetID),
        Date: date('Date'),
        CreatedAtUTC: timestamp("CreationTime"),
        WeighedAtUTC: timestamp("WeightTime"),
        Food: varchar('Food'),
        Quantity: decimal('Quantity'),
    },
    (eating_history) => ({
        petIndex: index('eating_history_pet_index').on(eating_history.PetID),
    })
);

export const WeightHistory = createTable(
    "weight_history",
    {
        RecordID: serial('RecordID').primaryKey(),
        PetID: integer('PetID').references(() => Pets.PetID),
        CreatedUTC: timestamp("CreationTime"),
        WeightedUTC: timestamp("WeightTime"),
        Weight: decimal('Weight'),
    },
    (weight_history) => ({
        petIndex: index('weight_history_pet_index').on(weight_history.PetID),
    })
);
