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
import OrganizationItem, { OrganizationType } from "./OrganizationItem";

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
    return <Skeleton />;
  }

  return (
    <>
      <div className="text-base flex items-center">
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
          <OrganizationItem
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
