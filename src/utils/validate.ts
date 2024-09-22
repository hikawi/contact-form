import { z } from "astro:schema";

const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()_+={};':",.<>/?`~\[\]\\|]/;

const schema = z.object({
  firstName: z
    .string()
    .min(1)
    .refine((value) => !numberRegex.test(value))
    .refine((value) => !specialCharRegex.test(value)),
  lastName: z
    .string()
    .min(1)
    .refine((value) => !numberRegex.test(value))
    .refine((value) => !specialCharRegex.test(value)),
  email: z.string().email(),
  queryType: z.enum(["General Enquiry", "Support Request"]),
  message: z.string().min(1),
  consent: z.literal(true),
});

function isDataValid(data: any) {
  return schema.safeParse(data).success;
}

/** Returns a tuple with a boolean and a string
 * The boolean is true if the name is valid
 * The string is an error message if the name is invalid */
function validateName(name: string): [boolean, string] {
  const result = z
    .string()
    .min(1, "This field is required")
    .refine((value) => !numberRegex.test(value), "Your name has numbers?")
    .refine((value) => !specialCharRegex.test(value), "What is that name?")
    .safeParse(name);
  return [result.success, result.error?.issues[0]?.message ?? ""];
}

function validateEmail(email: string): [boolean, string] {
  const result = z
    .string()
    .email("Please enter a valid email address")
    .safeParse(email);
  return [result.success, result.error?.issues[0]?.message ?? ""];
}

export { isDataValid, validateName, validateEmail };
