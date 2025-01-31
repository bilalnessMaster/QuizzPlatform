import { z } from "zod";

export const SignUpformSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "first name must at least 3 characters " })
    .max(24),
  lastName: z
    .string()
    .min(3, { message: "last  name must at least 3 characters " })
    .max(24),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number")
    // .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});
export const SignInformSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    // .max(20, "Password must be at most 20 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number")
    // .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

