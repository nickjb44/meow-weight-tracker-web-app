import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {db} from "~/server/db";
import {createPetRequestInput} from "~/schema/createPetRequestInput";
import {PetPeople, Pets} from "~/server/db/schema";

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
});