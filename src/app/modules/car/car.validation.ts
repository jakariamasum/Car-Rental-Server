import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(["available", "unavailable"]).default("available"),
    features: z.array(z.string()).default([]),
    pricePerHour: z.number().nonnegative(),
    fuelType: z.string(),
    image: z.string(),
    mileage: z.string(),
    transmission: z.string(),
    year: z.string(),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z
      .enum(["available", "unavailable"])
      .default("available")
      .optional(),
    features: z.array(z.string()).default([]).optional(),
    pricePerHour: z.number().nonnegative().optional(),
    fuelType: z.string().optional(),
    image: z.string().optional(),
    mileage: z.string().optional(),
    transmission: z.string().optional(),
    year: z.string().optional(),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
