"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoardSchema } from "./schema";

async function handler(validatedData: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = validatedData;

  const [imageId, imageThumbUrl, imageFullUrl, imageHTMLUrl, imageUsername] =
    image.split("|");

  let board;

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageHTMLUrl ||
    !imageUsername
  ) {
    return {
      error: "Missing fields! Cannot create board!",
    };
  }

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageHTMLUrl,
        imageUsername,
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
