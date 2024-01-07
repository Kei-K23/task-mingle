import { AuditLog } from "@prisma/client";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { generateAuditMessage } from "@/lib/generate-audit-message";
import { format } from "date-fns";

interface ActivityLogItemProps {
  auditLog: AuditLog;
}

const ActivityLogItem = ({ auditLog }: ActivityLogItemProps) => {
  return (
    <div className="flex gap-x-2">
      <Avatar>
        <AvatarImage src={auditLog.userImg} alt={auditLog.userName} />
        <AvatarFallback>{auditLog.userName}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex">
          <p>
            <span className="font-bold">{auditLog.userName}</span>{" "}
            {generateAuditMessage(auditLog)}
          </p>
        </div>
        <p className="text-[13px] text-muted-foreground">
          {format(new Date(auditLog.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </div>
  );
};

export default ActivityLogItem;
