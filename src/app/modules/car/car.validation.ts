import { z } from 'zod';

export const createCarValidationSchema = z.object({
    brand: z.string(),
    model: z.string(),
    image: z.string().optional(),
    year: z.number().int(),
    price: z.number(),
    category: z.string(),
    description: z.string(),
    quantity: z.number().int(),
    inStock: z.boolean(),
});