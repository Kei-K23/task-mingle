import ActionTooltip from "@/components/actionTooltip";
import { HelpCircleIcon, User } from "lucide-react";
import React from "react";
import FormPopover from "./formPopover";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvailableCount } from "@/lib/org-limit";
import { MAX_FREE_BOARD_LIMIT } from "@/constants/board";

const BoardLists = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
  });

  const availableCount = await getAvailableCount();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-x-1 text-lg font-bold">
        <User className="w-6 h-6" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover align="center" side="right" sideOffset={0}>
          <div
            role="button"
            className="border w-full h-full px-3 py-2 text-center bg-slate-200 hover:bg-slate-200/85 rounded-md relative flex justify-center items-center flex-col"
          >
            <p>Create new board</p>
            <span>{`${MAX_FREE_BOARD_LIMIT - availableCount}`} remaining</span>
            <ActionTooltip
              title="Free Workspaces board can have up to 5. For unlimited accept Workspaces upgrade the plan."
              className="w-[250px]"
              side="bottom"
            >
              <HelpCircleIcon className="w-4 h-4 absolute bottom-2 left-2" />
            </ActionTooltip>
          </div>
        </FormPopover>
        {boards.length > 0 &&
          boards.map((board) => (
            <Link
              href={`/boards/${board.id}`}
              key={board.id}
              className="relative group aspect-video w-full h-full rounded-md object-cover bg-center bg-cover bg-no-repeat bg-slate-100 overflow-hidden"
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            >
              <div className="absolute w-full h-full inset-0 group-hover:bg-black/40 transition-all"></div>
              <p className="absolute top-1 left-2 text-white font-bold">
                {board.title}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

BoardLists.Skeleton = function skeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video w-full h-full rounded-md" />
      <Skeleton className="aspect-video w-full h-full rounded-md" />
      <Skeleton className="aspect-video w-full h-full rounded-md" />
      <Skeleton className="aspect-video w-full h-full rounded-md" />
      <Skeleton className="aspect-video w-full h-full rounded-md" />
      <Skeleton className="aspect-video w-full h-full rounded-md" />
    </div>
  );
};

export default BoardLists;
