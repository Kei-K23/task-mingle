"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateListSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/type";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = validatedData;

  let list;

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

    const lastOrder = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastOrder ? lastOrder.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
      include: {
        cards: true,
      },
    });

    // create audit log
    await createAuditLog({
      action: ACTION["CREATE"],
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE["LIST"],
    });
  } catch (error) {
    return {
      error: "Something went wrong when creating list!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
}

export const createList = createSafeAction(CreateListSchema, handler);
