import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const barberRouter = createTRPCRouter({
  helloWorld: publicProcedure.query(({ ctx }) => {
    return "Hello World";
  }),
});
