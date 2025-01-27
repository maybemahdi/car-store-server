import { z } from "zod";

// Validation for user registration
export const registerUserValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .nonempty("Name cannot be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must be a valid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
});

// Validation for user login
export const loginUserValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email must be a valid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
});

// Types inferred from the Zod schemas
export type RegisterUserValidationType = z.infer<typeof registerUserValidation>;
export type LoginUserValidationType = z.infer<typeof loginUserValidation>;
