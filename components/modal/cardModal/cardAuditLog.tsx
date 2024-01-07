import ActivityLogItem from "@/components/activityLogItem";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import React from "react";

interface CardAuditLogProps {
  auditLogs: AuditLog[];
}

const CardAuditLog = ({ auditLogs }: CardAuditLogProps) => {
  console.log(auditLogs);

  return (
    <div>
      <div className="flex items-center gap-x-3">
        <ActivityIcon className="w-5 h-5" />
        <h2 className="font-bold">Activity</h2>
      </div>
      <div className="mt-2 space-y-3">
        {auditLogs.map((auditLog) => (
          <ActivityLogItem key={auditLog.id} auditLog={auditLog} />
        ))}
      </div>
    </div>
  );
};

export default CardAuditLog;
