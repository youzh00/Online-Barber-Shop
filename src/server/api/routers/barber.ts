// import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
// import { shopSchema } from "../types/ShopType";
// export const barberRouter = createTRPCRouter({
//   createShop: protectedProcedure
//     .input(shopSchema)
//     .mutation(async ({ input, ctx }) => {
//       const shop = await ctx.prisma.shop.create({
//         data: {
//           input,
//         },
//       });
//     }),
//   //   hello: publicProcedure
//   //     .input(z.object({ text: z.string() }))
//   //     .query(({ input }) => {
//   //       return {
//   //         greeting: `Hello ${input.text}`,
//   //       };
//   //     }),

//   //   getAll: publicProcedure.query(({ ctx }) => {
//   //     return ctx.prisma.example.findMany();
//   //   }),

//   //   getSecretMessage: protectedProcedure.query(() => {
//   //     return "you can now see this secret message!";
//   //   }),
// });
