import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { HaircutSchema, HaircutSchemaForUpdate } from "../schemas/haircut";
import { barberProcedure, createTRPCRouter } from "../trpc";

export const haircutRouter = createTRPCRouter({
  addHaircutToShop: barberProcedure
    .input(HaircutSchema)
    .mutation(async ({ input, ctx }) => {
      const haircut = await ctx.prisma.haircut.create({
        data: {
          description: input.description,
          name: input.name,
          price: input.price,
          picture: input.picture,
          shopId: input.shopId,
          estimatedTime: input.estimatedTime,
        },
      });
      return haircut;
    }),
  getHaircutsByShopId: barberProcedure
    .input(z.object({ shopId: z.string() }))
    .query(async ({ input, ctx }) => {
      const haircuts = await ctx.prisma.haircut.findMany({
        where: { shopId: input.shopId },
      });
      return haircuts;
    }),

  getHaircutById: barberProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const haircut = await ctx.prisma.haircut.findUnique({
        where: { id: input.id },
      });
      if (!haircut) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Haircut does not exist",
        });
      }
      return haircut;
    }),
  deleteHaircut: barberProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const exist = await ctx.prisma.haircut.findUnique({
        where: { id: input.id },
      });
      if (!exist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Haircut does not exist",
        });
      }
      const haircut = await ctx.prisma.haircut.delete({
        where: { id: input.id },
      });
      return haircut;
    }),
  updateHaircut: barberProcedure
    .input(HaircutSchemaForUpdate)
    .mutation(async ({ input, ctx }) => {
      const exist = await ctx.prisma.haircut.findUnique({
        where: { id: input.haircutId },
      });
      if (!exist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Haircut does not exist",
        });
      }
      const { haircutId, ...haircutData } = input;
      const haircut = await ctx.prisma.haircut.update({
        where: { id: haircutId },
        data: {
          ...haircutData,
        },
      });
      return haircut;
    }),
});
