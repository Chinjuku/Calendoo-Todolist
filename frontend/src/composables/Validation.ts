import { z } from "zod"

export const contactSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("This is not a valid email."),
    location: z.string().min(15, {
      message: "Location must be at least 15 characters.",
    }),
    messages: z.string().min(10, {
      message: "Message must be at least 10 characters.",
    }),
})

export const projectSchema = z.object({
    project: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    color: z.string({ required_error: 'Add your Color' }).min(1, {
        message: "Choose your Color",
      }),
})