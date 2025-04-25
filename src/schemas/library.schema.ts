import { z } from "zod";

export const libraryCreateSchema = z.object({
    name: z.string().max(100).nonempty()
});

export const libraryUpdateSchema = z.object({
    name: z.string().max(100).nonempty()
});