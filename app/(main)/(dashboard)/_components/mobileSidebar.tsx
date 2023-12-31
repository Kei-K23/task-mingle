"use client";
import ActionTooltip from "@/components/actionTooltip";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import usePreventHydration from "@/hooks/usePreventHydration";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  usePreventHydration();
  const pathname = usePathname();

  const { onOpen, onClose, isOpen } = useMobileSidebar();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <ActionTooltip title="mobile sidebar">
        <Button
          size={"icon"}
          variant={"outline"}
          className="flex md:hidden"
          onClick={onOpen}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </ActionTooltip>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-11">
          <Sidebar sidebarStorageKey="taskMingle-m-sidebar" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
