import { z } from "zod";

export const RatingSchema = z.object({
  rating: z.number(),
});
