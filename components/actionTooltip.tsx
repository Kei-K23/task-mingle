import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

interface ActionTooltipProps {
  children: React.ReactNode;
  title: string;
  align?: "center" | "start" | "end";
  side?: "bottom" | "top" | "left" | "right";
  className?: string;
}

const ActionTooltip = ({
  align = "center",
  children,
  side = "top",
  title,
  className,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          className={cn("lowercase", className)}
        >
          <p className="capitalize">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
