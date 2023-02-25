import { z } from "zod";

export const HaircutSchema = z.object({
  shopId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  picture: z.string(),
});
