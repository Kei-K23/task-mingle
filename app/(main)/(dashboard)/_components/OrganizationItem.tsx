import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export type OrganizationType = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface OrganizationItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: OrganizationType;
  onExpand: (id: string) => void;
}

const OrganizationItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: OrganizationItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  function onClick(href: string) {
    return router.push(href);
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex px-4 rounded-md py-2 hover:bg-slate-100 hover:no-underline transition-all text-start",
          isActive && !isExpanded && "bg-slate-100"
        )}
      >
        <div className="rounded-md relative w-7 h-7">
          <Image
            src={organization.imageUrl}
            alt={organization.name}
            fill
            className="rounded-md"
          />
        </div>
        <span>{organization.name}</span>
      </AccordionTrigger>
      <AccordionContent>
        {routes.map((route) => (
          <Button
            variant={"ghost"}
            className={cn(
              "w-full flex justify-start items-center gap-x-2 pl-8",
              pathname === route.href && "bg-slate-100"
            )}
            key={route.label}
            onClick={() => onClick(route.href)}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default OrganizationItem;
