import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  updateToBarber: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      const user = await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          role: "BARBER",
        },
      });

      return user;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const user = await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          ...input,
        },
      });

      return user;
    }),
  deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.prisma.user.delete({
      where: { id: userId },
    });

    return user;
  }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }),
});
