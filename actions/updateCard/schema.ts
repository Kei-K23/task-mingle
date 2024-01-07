import { z } from "zod";

export const UpdateCardSchema = z.object({
  id: z.string({
    required_error: "Card id is required",
    invalid_type_error: "Card id is string",
  }),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be type of string",
    })
    .min(1, {
      message: "Title must be at least 3 character",
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be type of string",
    })
    .optional(),
  boardId: z.string({
    required_error: "Board id is require!",
    invalid_type_error: "Board id must be type of string",
  }),
});
