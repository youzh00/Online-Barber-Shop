import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { shopRouter } from "./routers/shop";
import { haircutRouter } from "./routers/haircut";
import { serviceRouter } from "./routers/service";

export const appRouter = createTRPCRouter({
  shop: shopRouter,
  haircut: haircutRouter,
  user: userRouter,
  service: serviceRouter,
});

export type AppRouter = typeof appRouter;
