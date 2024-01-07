"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/type";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId, id } = validatedData;

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

    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });

    // create audit log
    await createAuditLog({
      action: ACTION["UPDATE"],
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE["LIST"],
    });
  } catch (error) {
    return {
      error: "Something went wrong when updating list!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
}

export const updateList = createSafeAction(UpdateListSchema, handler);
