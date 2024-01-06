"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrderSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, cards } = validatedData;

  let newCards;

  try {
    const board = await db.board.findFirst({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Could not find the Board!",
      };
    }

    const transaction = cards.map((card) => {
      return db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      });
    });

    newCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Something went wrong when re-ordering cards!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: newCards };
}

export const updateCardOrder = createSafeAction(UpdateCardOrderSchema, handler);
