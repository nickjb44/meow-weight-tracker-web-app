import {z} from "zod";

export const getPetsRequest = z.object({
    userId: z.string(),
});

export type GetPetsRequest = z.infer<typeof getPetsRequest>;
