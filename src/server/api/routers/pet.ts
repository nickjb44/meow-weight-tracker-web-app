import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {db} from "~/server/db";
import {createPetRequestInput} from "~/schema/createPetRequestInput";
import {PetPeople, Pets} from "~/server/db/schema";
import {getPetsRequest} from "~/schema/getPetsRequest";
import {eq} from "drizzle-orm/expressions";

export const petRouter = createTRPCRouter({
    insertPet: publicProcedure
        .input(createPetRequestInput)
        .mutation(async ({input}) => {
            const {species, gender, name, age, userId} = input;

            return await db.transaction(async (trx) => {
                const [newPet] = await trx.insert(Pets).values({
                    Species: species,
                    Gender: gender,
                    Name: name,
                    Age: age,
                }).returning({
                    PetID: Pets.PetID,
                    Species: Pets.Species,
                    Gender: Pets.Gender,
                    Name: Pets.Name,
                    Age: Pets.Age,
                })

                if (!newPet) {
                    trx.rollback()
                    // TODO : make error more informative
                    throw new Error("Failed to create the pet entry")
                }


                await trx.insert(PetPeople).values({
                    UserID: userId,
                    PetID: newPet.PetID,
                    CreatedAt: new Date(),
                    UpdatedAt: new Date(),
                    Role: 'Owner'
                });

                return newPet;
            });
        }),
    // TODO: update to enforce the userId is equal to the logged in user
    getPets: publicProcedure
        .input(getPetsRequest)
        .query(async ({input}) => {
            const { userId } = input;
            return await db.select()
                .from(Pets)
                .innerJoin(PetPeople, eq(Pets.PetID, PetPeople.PetID))
                .where(eq(PetPeople.UserID, userId))
                .execute()
            }),
});