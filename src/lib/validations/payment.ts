import * as z from "zod";

export const PaymentValidation = z.object({
  email: z.string()
    .min(3, { message: "Email must be at least 3 characters long" })
    .nonempty({ message: "Email cannot be empty" })
    .email({ message: "Email must be a valid email address" }),  // Optional: Add email format validation
  amount: z.string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 100, {
      message: "Amount must be at least 100",
    }),
  domain: z.string()
    .min(3, { message: "Domain must be at least 3 characters long" })
    .nonempty({ message: "Domain cannot be empty" })
    .refine((val) => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
      message: "Domain must be a valid domain format",
    }),  // Optional: Add domain format validation
});
