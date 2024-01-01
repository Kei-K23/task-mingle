"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoardSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title } = validatedData;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong when creating board",
    };
  }

  revalidatePath(`/boards/${board.id}`);
  return { data: board };
}

export const createBoard = createSafeAction(CreateBoardSchema, handler);
