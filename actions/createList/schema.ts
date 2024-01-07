import { z } from "zod";

export const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "Title is require!",
      invalid_type_error: "Title must be type of string",
    })
    .min(1, {
      message: "Title must be at least 1 character",
    }),
  boardId: z.string({
    required_error: "Board id is require!",
    invalid_type_error: "Board id must be type of string",
  }),
});
