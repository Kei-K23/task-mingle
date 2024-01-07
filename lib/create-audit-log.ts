import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface CreateAuditLogProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
  entityTitle: string;
}

export async function createAuditLog({
  entityId,
  entityTitle,
  entityType,
  action,
}: CreateAuditLogProps) {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!user || !orgId) {
      throw new Error("Unauthorized!");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userImg: user.imageUrl,
        userName: user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName!,
      },
    });
  } catch (e: any) {
    console.log(e);
    return null;
  }
}
