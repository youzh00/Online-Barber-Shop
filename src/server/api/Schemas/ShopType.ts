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
// can you seed of the above object
// const shop: z.infer<typeof shopSchema> = {
//   name: "barber shop",
//   address: "123 main street",
//   type: "BOTH",
//   phone: "123-456-7890",
//   email: "youssef.zahi@gmail.com",
//   queue: 5,
//   pictures: ["https://www.google.com"],
//   description: "this is a barber shop",
//   opening: new Date(),
//   closing: new Date(),
//   lat: 123,
//   lng: 456,
// };
