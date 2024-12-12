import { z } from "zod";
export const ContactUsFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "FirstName must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "LastName must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please, provide a valid email.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please provide a valid phone number.",
  }),
});

export type ContactUsFormSchemaType = z.infer<typeof ContactUsFormSchema>;
