import { z } from "zod";
export const shopSchema = z.object({
  name: z.string(),
  city: z.string(),
  street: z.string(),
  type: z.enum(["FEMALE", "MALE", "BOTH"]),
  phone: z.string(),
  email: z.string(),
  queue: z.number().optional(),
  pictures: z.array(z.string().url()),
  description: z.string(),
  opening: z.string(),
  closing: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const shopSchemaUpdate = z.object({
  shopId: z.string().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  zipcode: z.string().optional(),
  type: z.enum(["FEMALE", "MALE", "BOTH"]).optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  queue: z.number().optional(),
  pictures: z.array(z.string().url()).optional(),
  description: z.string().optional(),
  opening: z.date().optional(),
  closing: z.date().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
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
