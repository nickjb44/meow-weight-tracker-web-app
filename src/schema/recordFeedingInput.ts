import { z } from "zod";
export const recordFeedingInput = z.object({
    petId: z.number(),
    foodId: z.number(),
    quantity: z.number(),
    unit: z.string(),
    fedAt: z.date().optional(), // Optional; defaults to now if not provided
});
