"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/type";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, id, listId } = validatedData;
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

    card = await db.card.delete({
      where: {
        id,
        listId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    // create audit log
    await createAuditLog({
      action: ACTION["DELETE"],
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE["CARD"],
    });
  } catch (error) {
    return {
      error: "Something went wrong when deleting card!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
}

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
