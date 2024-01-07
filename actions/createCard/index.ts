"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/type";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, listId, boardId } = validatedData;

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

    const lastOrder = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastOrder ? lastOrder.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    // create audit log
    await createAuditLog({
      action: ACTION["CREATE"],
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE["CARD"],
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Something went wrong when creating card!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
}

export const createCard = createSafeAction(CreateCardSchema, handler);
