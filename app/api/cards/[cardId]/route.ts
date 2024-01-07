import { db } from "@/lib/db";
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

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: card,
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
