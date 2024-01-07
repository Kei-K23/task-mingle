import React, { Suspense } from "react";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import AuditLogContainer from "./_components/auditLogContainer";
import { db } from "@/lib/db";

const ActivityPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId: params.organizationId,
    },
  });

  return (
    <div className="w-full">
      <Info />
      <Separator className="my-4 w-full" />
      <Suspense fallback={<AuditLogContainer.Skeleton />}>
        <AuditLogContainer auditLogs={auditLogs} />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
