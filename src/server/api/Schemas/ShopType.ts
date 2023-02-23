import { z } from "zod";
export const shopSchema = z.object({
  name: z.string(),
  address: z.string(),
  type: z.enum(["FEMALE", "MALE", "BOTH"]),
  phone: z.string(),
  email: z.string(),
  queue: z.number(),
  pictures: z.array(z.string().url()),
  description: z.string(),
  opening: z.date(),
  closing: z.date(),
  lat: z.number(),
  lng: z.number(),
});
