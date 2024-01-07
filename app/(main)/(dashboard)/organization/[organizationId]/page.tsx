import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardLists from "./_components/boardLists";
import { checkSubScription } from "@/lib/subscription";

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const isSubscribe = await checkSubScription();

  return (
    <div className="w-full">
      <Info isSubscribe={isSubscribe} />
      <Separator className="my-4" />
      <Suspense fallback={<BoardLists.Skeleton />}>
        <BoardLists />
      </Suspense>
    </div>
  );
};

export default OrganizationIdPage;
