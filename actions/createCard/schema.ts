import { z } from "zod";

export const CreateCardSchema = z.object({
  title: z
    .string({
      required_error: "Title is require!",
      invalid_type_error: "Title must be type of string",
    })
    .min(1, {
      message: "Title must be at least 3 character",
    }),
  listId: z.string({
    required_error: "List id is require!",
    invalid_type_error: "List id must be type of string",
  }),
  boardId: z.string({
    required_error: "Board id is require!",
    invalid_type_error: "Board id must be type of string",
  }),
});
