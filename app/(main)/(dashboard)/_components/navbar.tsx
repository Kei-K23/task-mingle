import ActionTooltip from "@/components/actionTooltip";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";
import MobileSidebar from "./mobileSidebar";
import FormPopover from "../organization/[organizationId]/_components/formPopover";

export const Navbar = () => {
  return (
    <header className="bg-white border-b border-b-slate-300 fixed top-0 w-full px-8 py-3 md:py-4 z-40">
      <div className="flex items-center justify-center">
        <nav className="w-full md:max-w-screen-2xl flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <Logo />
            <MobileSidebar />
            <FormPopover sideOffset={15} align="start" side="bottom">
              <Button size={"sm"}>
                <Plus className="w-5 h-5 mr-1" />
                <span className="hidden md:block">Create</span>
              </Button>
            </FormPopover>
          </div>
          <div className=" flex items-center justify-between gap-x-3">
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl={"/organization/:id"}
              afterSelectOrganizationUrl={"/organization/:id"}
              afterLeaveOrganizationUrl={"/select-org"}
              appearance={{
                elements: {
                  rootBox: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
              }}
            />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: 30,
                    height: 30,
                  },
                },
              }}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
