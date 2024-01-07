"use client";

import ActionTooltip from "@/components/actionTooltip";
import { Accordion } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import OrgItem, { OrganizationType } from "./orgItem";

interface SidebarProps {
  sidebarStorageKey: string;
}

const Sidebar = ({ sidebarStorageKey }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    sidebarStorageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadingOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadingOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue = Object.keys(expanded).reduce(
    (acc: string[], curr) => {
      if (expanded[curr]) {
        acc.push(curr);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => {
      return {
        ...curr,
        [id]: !expanded[id],
      };
    });
  };

  if (!isLoadingOrg || !isLoadingOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center mb-3">
          <Skeleton className="w-[130px] h-8" />
          <Skeleton className="w-[50px] h-8 ml-auto" />
        </div>
        <div className="space-y-2">
          <OrgItem.Skeleton />
          <OrgItem.Skeleton />
          <OrgItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-base flex items-center mb-3">
        <span>Workspace</span>
        <ActionTooltip title="create organization">
          <Link
            href={"/select-org"}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-xl ml-auto"
            )}
          >
            <Plus className="w-5 h-5" />
          </Link>
        </ActionTooltip>
      </div>
      <Accordion
        defaultValue={defaultAccordionValue}
        type="multiple"
        className="space-y-3"
      >
        {userMemberships.data.map(({ organization }) => (
          <OrgItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as OrganizationType}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
