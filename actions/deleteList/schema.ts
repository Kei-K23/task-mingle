import { z } from "zod";

export const DeleteListSchema = z.object({
  boardId: z.string({
    required_error: "Board id is require!",
    invalid_type_error: "Board id must be type of string",
  }),
  id: z.string({
    required_error: "List id is require!",
    invalid_type_error: "List id must be type of string",
  }),
});
