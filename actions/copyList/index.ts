"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyListSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, id } = validatedData;
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

    const existingList = await db.list.findFirst({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

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

    if (!existingList) {
      return {
        error: "Could not find the list to copy!",
      };
    }

    list = await db.list.create({
      data: {
        boardId: existingList?.boardId,
        title: `${existingList?.title}-copy`,
        order: newOrder,
      },
      include: {
        cards: true,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong when copying list!",
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
}

export const copyList = createSafeAction(CopyListSchema, handler);
