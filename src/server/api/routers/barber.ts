import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { shopSchema } from "../Schemas/ShopType";
import { z } from "zod";
export const barberRouter = createTRPCRouter({
  createShop: protectedProcedure
    .input(shopSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const shop = await ctx.prisma.shop.create({
        data: {
          ...input,
          user: { connect: { id: user.id } },
        },
      });
      return shop;
    }),
  // updateShop: protectedProcedure
  //   .input(shopSchema.optional)
  //   .mutation(async ({ input, ctx }) => {
  //     const user = ctx.session.user;
  //     const shop = await ctx.prisma.shop.update({
  //       where: { id: input?.id },
  //       data: {
  //         ...input,
  //       },
  //     });
  //     return shop;
  //   }),
  deleteShop: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const shop = await ctx.prisma.shop.delete({
        where: { id: input.id },
      });
      return shop;
    }),
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
