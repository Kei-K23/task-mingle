"use client";

import ActivityLogItem from "@/components/activityLogItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import React from "react";

interface AuditLogContainerProps {
  auditLogs: AuditLog[];
}

const AuditLogContainer = ({ auditLogs }: AuditLogContainerProps) => {
  return (
    <ScrollArea className="w-full h-full space-y-4 mt-4 mb-10">
      {auditLogs.length > 0 ? (
        auditLogs.map((auditLog) => (
          <ActivityLogItem key={auditLog.id} auditLog={auditLog} />
        ))
      ) : (
        <h2 className="text-center">No activity in this organization!</h2>
      )}
    </ScrollArea>
  );
};

AuditLogContainer.Skeleton = function skeleton() {
  return (
    <div className="w-[50%]  space-y-4 mt-4 mb-10">
      <Skeleton className="w-full h-[25px]" />
      <Skeleton className="w-full h-[25px]" />
      <Skeleton className="w-full h-[25px]" />
      <Skeleton className="w-full h-[25px]" />
      <Skeleton className="w-full h-[25px]" />
    </div>
  );
};

export default AuditLogContainer;
