"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { string, z } from "zod";

export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath(`organization/org_2aJ2JlOziQZoyHdR3VH1tT3qL9r`);
}
