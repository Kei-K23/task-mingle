import { z } from "zod";

export const UpdateCardOrderSchema = z.object({
  boardId: z.string({
    required_error: "Board id is require!",
    invalid_type_error: "Board id must be type of string",
  }),
  cards: z.array(
    z.object({
      id: z.string({ required_error: "List id is required!" }),
      title: z.string({
        required_error: "List title is required",
      }),
      order: z.number({
        required_error: "List order is required",
      }),
      description: z.string().optional().nullable(),
      listId: z.string({
        required_error: "List id is required",
      }),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
