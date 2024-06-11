import { z } from "zod";

const createUserSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    role: z.enum(["user", "admin"]),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserSchemaValidation,
};
