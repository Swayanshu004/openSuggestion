import {z} from "zod"

export const signInSchema = z.object({
    indentifier: z.string(),
    password: z.string().min(8,{message: 'password is less than 8'})
}) 