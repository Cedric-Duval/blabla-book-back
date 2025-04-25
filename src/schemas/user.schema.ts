import { z } from "zod";

export const userDatasUpdate = z.object({
    name: z.string().max(100).nonempty(),
    firstname: z.string().max(100).nonempty(),
    email: z.string().max(100).nonempty(),
    password: z.string().nonempty()
})