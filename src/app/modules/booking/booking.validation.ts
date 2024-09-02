import { z } from "zod";

const createBookingSchemaValidation = z.object({
  body: z.object({
    car: z.string(),
    date: z.string(),
  }),
});

export const BookingValidations = {
  createBookingSchemaValidation,
};
