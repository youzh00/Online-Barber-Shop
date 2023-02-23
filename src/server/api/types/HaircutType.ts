import { z } from "zod";

export const HaircutSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  picture: z.string(),
});
