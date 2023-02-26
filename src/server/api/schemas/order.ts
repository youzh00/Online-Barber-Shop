import { z } from "zod";

export const Order = z.object({
  date: z.date(),
  status: z.enum(["NEW", "PENDING", "PAID", "DONE", "CANCELED"]),
  queueNumber: z.number(),
});
