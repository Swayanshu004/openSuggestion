import {z} from "zod"

export const messageSchema = z.string().min(10, {message: "minimum limit 10 char..."}).max(300, {message: "maximum limit 300 char..."})