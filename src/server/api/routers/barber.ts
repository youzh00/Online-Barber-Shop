import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const barberRouter = createTRPCRouter({
    createShop: protectedProcedure
        .input(z.object({
            name: z.string(),
            address: z.string(),
            location: z.object({
                lat: z.number(),
                lng: z.number(),
            }),
            pictures: z.array(z.string()),
            description: z.string(),
            offers:z.string(),
            // rating:z. 
            
            }))
        .query(({ input }) => {
            return {
                greeting: `Hello`,
            };
        })
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});