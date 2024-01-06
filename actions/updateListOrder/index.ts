"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrderSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, lists } = validatedData;

  let newLists;

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

    const transaction = lists.map((list) => {
      return db.list.update({
        where: {
          id: list.id,
          boardId: list.boardId,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      });
    });

    newLists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Something went wrong when re-ordering list!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: newLists };
}

export const updateListOrder = createSafeAction(UpdateListOrderSchema, handler);
