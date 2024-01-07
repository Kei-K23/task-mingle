import { db } from "@/lib/db";
import { ENTITY_TYPE } from "@/type";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { orgId, userId } = auth();

    if (!orgId || !userId) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Unauthorized!" }),
        {
          status: 403,
        }
      );
    }

    const logs = await db.auditLog.findMany({
      where: {
        entityId: params.cardId,
        entityType: ENTITY_TYPE["CARD"],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: logs,
      })
    );
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: "Could not fetch data" }),
      {
        status: 500,
      }
    );
  }
}
