import React, { Suspense } from "react";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import AuditLogContainer from "./_components/auditLogContainer";
import { db } from "@/lib/db";
import { checkSubScription } from "@/lib/subscription";

const ActivityPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const isSubscribe = await checkSubScription();
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId: params.organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full">
      <Info isSubscribe={isSubscribe} />
      <Separator className="my-4 w-full" />
      <Suspense fallback={<AuditLogContainer.Skeleton />}>
        <AuditLogContainer auditLogs={auditLogs} />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
