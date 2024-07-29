import {z} from 'zod'

export const signupSchema = z.object({
    username: z.string().max(20, "Username sould not be more than 20 char...").regex(/^[a-zA-Z0-9_]+$/,"username must not contain special char..."),
    email: z.string().email({message: "invalid email address"}),
    password: z.string().min(8,{message: 'password is less than 8'})
})
