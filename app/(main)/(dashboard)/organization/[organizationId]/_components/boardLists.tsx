"use client";
import ActionTooltip from "@/components/actionTooltip";
import { HelpCircleIcon, User } from "lucide-react";
import React from "react";
import FormPopover from "./formPopover";

const BoardLists = () => {
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
            className="border w-full h-full px-3 py-2 text-center bg-slate-200 hover:bg-slate-200/85 rounded-md"
          >
            <p>Create new board</p>
            <span>5 remaining</span>
            <ActionTooltip
              title="Free Workspaces board can have up to 5. For unlimited accept Workspaces upgrade the plan."
              className="w-[200px]"
              side="bottom"
            >
              <HelpCircleIcon className="w-4 h-4" />
            </ActionTooltip>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardLists;
