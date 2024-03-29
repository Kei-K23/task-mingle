"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCardSchema } from "./schema";
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

    const existingCard = await db.card.findFirst({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: true,
      },
    });

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

    if (!existingCard) {
      return {
        error: "Could not find the card to copy!",
      };
    }

    card = await db.card.create({
      data: {
        listId: existingCard.listId,
        description: existingCard.description,
        title: `${existingCard?.title}-copy`,
        order: newOrder,
      },
      include: {
        list: true,
      },
    });

    // create audit log
    await createAuditLog({
      action: ACTION["COPY"],
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE["CARD"],
    });
  } catch (error) {
    return {
      error: "Something went wrong when copying card!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
}

export const copyCard = createSafeAction(CopyCardSchema, handler);
