import {z} from "zod";

export const messageSchema= z.object({
    content:z
        .string()
        .min(10,"must be greater than")
        .max(10,"must be greater than")
})