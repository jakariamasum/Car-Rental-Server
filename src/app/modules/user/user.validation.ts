import { z } from "zod";

const signUpSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    role: z.enum(["user", "admin"]),
    password: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

const sinInSchemaValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const UserValidations = {
  signUpSchemaValidation,
  sinInSchemaValidation,
};
