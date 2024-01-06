import { z } from "zod";

export const UpdateListOrderSchema = z.object({
  boardId: z.string({
    required_error: "Board id is require!",
    invalid_type_error: "Board id must be type of string",
  }),
  lists: z.array(
    z.object({
      id: z.string({ required_error: "List id is required!" }),
      title: z.string({
        required_error: "List title is required",
      }),
      order: z.number({
        required_error: "List order is required",
      }),
      boardId: z.string({
        required_error: "Board id is required",
      }),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
