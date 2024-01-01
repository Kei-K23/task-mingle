import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is require!",
      invalid_type_error: "Title must be type of string",
    })
    .min(3, {
      message: "Title must be at least 3 character",
    }),
});
