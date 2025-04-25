import { z } from "zod";

export const libraryUpdateSchema = z.object({
    name: z.string().max(100).nonempty()
});