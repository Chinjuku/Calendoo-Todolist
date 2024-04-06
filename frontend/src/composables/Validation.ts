import { ZodType, z } from "zod"
import { AddNoteData, ListData } from "./Validation.types";

// @/Home/ContactForm.tsx
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

// @/pages/Project.tsx
export const projectSchema = z.object({
    project: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    color: z.string({ required_error: 'Add your Color' }).min(1, {
        message: "Choose your Color",
      }),
})

// @/Notes/AddList.tsx
export const ListSchema: ZodType<ListData> = z.object({
    // อาจจะตรวจสอบว่าชื่อ list ตรงกับใน database มั้ย
    namelist: z
    .string({
      required_error: "Please select an color to display.",
    }).min(1, { message: "Please select at least 1 character." }),
    color: z
      .string({
        required_error: "Please select an color to display.",
      }),
});

// @/Notes/AddNote.tsx
export const AddNoteSchema: ZodType<AddNoteData> = z.object({
    title: z.string(
        { required_error: "Please require title." }
    ).min(2, { message: "Title must be at least 2 characters." }),
    description: z.string(
        { required_error: "Please require description." }
    ).min(10, { message: "Description must be at least 10 characters." }),
    // Use foreign key to get color!!!
    namelist: z
    .string({
      required_error: "Please select namelist.",
    }),
    date: z.date(),
    time: z.string(),
    piority: z
    .number({
      required_error: "Please select Piority.",
    })
});