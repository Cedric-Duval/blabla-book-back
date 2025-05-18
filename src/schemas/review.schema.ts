import sanitizeHtml from "sanitize-html";
import { z } from "zod";

export const reviewSchema = z
.object(
    {
        content: z
            .string()
            .transform((data) => sanitizeHtml(data)),
        rating: z
            .number(),
        user_id: z
            .string()
            .regex(/^[1-9]\d*$/)
            .transform(Number),
        book_id: z
            .string()
            .regex(/^[1-9]\d*$/)
            .transform(Number),
    }
)
.partial();

export const paramsReviewIdSchema = z
.object(
    {
        id: z
            .string()
            .regex(/^[1-9]\d*$/, { message: "Format d'url invalide" })
            .transform(Number),
    }
);
