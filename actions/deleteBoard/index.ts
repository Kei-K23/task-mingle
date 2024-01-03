"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoardSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = validatedData;
  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong when deleting board",
    };
  }

  revalidatePath(`/boards/${board.id}`);
  return { data: board };
}

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);
