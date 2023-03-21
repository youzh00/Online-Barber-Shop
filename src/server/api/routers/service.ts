import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import allCities from "../../../assets/cities.json";

const services = [
  "Haircut",
  "Mens haircut",
  "Womens haircut",
  "Kids haircut",
  "Beard trim",
  "Beard shave",
  "Beard dye",
  "Beard trim and shave",
  "Beard trim and dye",
  "Beard shave and dye",
  "Beard trim, shave and dye",
  "Haircut and beard trim",
  "Haircut and beard shave",
  "Haircut and beard dye",
  "Haircut and beard trim and shave",
  "Haircut and beard trim and dye",
  "Haircut and beard shave and dye",
  "Haircut and beard trim, shave and dye",
  "Haircut and beard shave and dye",
];

export const serviceRouter = createTRPCRouter({
  searchServices: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1).max(100),
      })
    )
    .mutation(({ input }) => {
      return services.filter((service) =>
        service.toLowerCase().includes(input.query.toLowerCase())
      );
    }),
  searchCities: protectedProcedure
    .input(
      z.object({
        query: z.string().min(1).max(100),
      })
    )
    .mutation(({ input }) =>
      allCities.filter(({ city }) =>
        (city as string).toLowerCase().includes(input.query.toLowerCase())
      )
    ),
});
