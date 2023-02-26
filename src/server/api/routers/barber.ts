import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { HaircutSchema, HaircutSchemaForUpdate } from "../schemas/haircut";
import { shopSchema, shopSchemaUpdate } from "../schemas/shop";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  updateShop: protectedProcedure
    .input(shopSchemaUpdate)
    .mutation(async ({ input, ctx }) => {
      const exist = await ctx.prisma.shop.findUnique({
        where: { id: input.shopId },
      });
      if (!exist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shop does not exist",
        });
      }
      const { shopId, ...shopData } = input;
      const shop = await ctx.prisma.shop.update({
        where: { id: shopId },
        data: {
          ...shopData,
        },
      });
      return shop;
    }),
  deleteShop: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const exist = await ctx.prisma.shop.findUnique({
        where: { id: input.id },
      });
      if (!exist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shop does not exist",
        });
      }
      const shop = await ctx.prisma.shop.delete({
        where: { id: input.id },
      });
      return shop;
    }),
  getShopById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const shop = await ctx.prisma.shop.findUnique({
        where: { id: input.id },
      });
      if (!shop) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Shop does not exist",
        });
      }
      return shop;
    }),
  // Haircuts part
  addHaircutToShop: protectedProcedure
    .input(HaircutSchema)
    .mutation(async ({ input, ctx }) => {
      const haircut = await ctx.prisma.haircut.create({
        data: {
          description: input.description,
          name: input.name,
          price: input.price,
          picture: input.picture,
          shopId: input.shopId,
        },
      });
      return haircut;
    }),
  getHaircutById: protectedProcedure
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
  deleteHaircut: protectedProcedure
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
  updateHaircut: protectedProcedure
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
