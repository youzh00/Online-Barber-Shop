import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { shopSchema, shopSchemaUpdate } from "../schemas/shop";
import { barberProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import cloudinary from "cloudinary";
import { env } from "../../../env.mjs";

// cloudinary.v2.config({
//   cloud_name: env.CLOUD_NAME,
//   api_key: env.CLOUD_API_KEY,
//   api_secret: env.CLOUD_API_SECRET,
// });

export const shopRouter = createTRPCRouter({
  createShop: barberProcedure
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
  updateShop: barberProcedure
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
  deleteShop: barberProcedure
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
  getShopById: barberProcedure
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
  getAllShops: protectedProcedure.query(async ({ ctx }) => {
    const shops = await ctx.prisma.shop.findMany();
    return shops;
  }),
});
