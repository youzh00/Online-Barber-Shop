import { createTRPCRouter } from "./trpc";
import { barberRouter } from "./routers/barber";
import { userRouter } from "./routers/user";
import { shopRouter } from "./routers/shop";
import { haircutRouter } from "./routers/haircut";

export const appRouter = createTRPCRouter({
  barber: barberRouter,
  shop: shopRouter,
  haircut: haircutRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
