import { z } from "zod";

export const createPetRequestInput = z.object({
    species: z.string(),
    gender: z.string(),
    name: z.string(),
    age: z.number(),
    userId: z.string()
})

export type CreatePetRequestInput = z.infer<typeof createPetRequestInput>;