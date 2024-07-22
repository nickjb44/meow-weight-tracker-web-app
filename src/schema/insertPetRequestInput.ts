import { z } from "zod";

export const insertPetRequestInput = z.object({
    species: z.string(),
    gender: z.string(),
    name: z.string(),
    age: z.number(),
    userId: z.string()
})

export type InsertPetRequestInput = z.infer<typeof insertPetRequestInput>;