"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId, ...values } = validatedData;

  let card;

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

    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong when updating card!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  revalidatePath("/");
  return { data: card };
}

export const updateCard = createSafeAction(UpdateCardSchema, handler);
