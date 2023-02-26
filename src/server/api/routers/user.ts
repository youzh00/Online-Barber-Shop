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
});
