import { createTRPCRouter } from "./trpc";
import { barberRouter } from "./routers/barber";
import { userRouter } from "./routers/user";
import { shopRouter } from "./routers/shop";
import { haircutRouter } from "./routers/haircut";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  barber: barberRouter,
  shop: shopRouter,
  haircut: haircutRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
