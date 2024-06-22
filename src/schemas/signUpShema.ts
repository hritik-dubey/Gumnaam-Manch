import {z} from "zod"

export const UserNameValidation = z
    .string()
    .min(3,"username must be at least")
    .max(20,"username must be at most")
    .regex(/^[a-zA-Z0-9]+$/,"username must not contain special characters")

export const signUpSchema = z.object({
    username: UserNameValidation,
    password:  z.string().min(8,"password must be at least 8 characters"),
    email: z.string().email("invalid email")
})