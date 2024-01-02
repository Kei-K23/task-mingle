import React from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardLists from "./_components/boardLists";

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-4" />
      <BoardLists />
    </div>
  );
};

export default OrganizationIdPage;
