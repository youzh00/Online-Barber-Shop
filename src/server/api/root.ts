import { createTRPCRouter } from "./trpc";
import { barberRouter } from "./routers/barber";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  barber: barberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
