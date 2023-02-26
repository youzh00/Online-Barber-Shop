import { z } from "zod";

export const HaircutSchema = z.object({
  shopId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  picture: z.string(),
});

export const HaircutSchemaForUpdate = z.object({
  haircutId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  picture: z.string().optional(),
});
