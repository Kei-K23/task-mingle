import { AuditLog } from "@prisma/client";

export function generateAuditMessage(auditLog: AuditLog) {
  switch (auditLog.action) {
    case "CREATE":
      return `created ${auditLog.entityType.toLowerCase()} "${
        auditLog.entityTitle
      }"`;
    case "UPDATE":
      return `updated ${auditLog.entityType.toLowerCase()} "${
        auditLog.entityTitle
      }"`;
    case "DELETE":
      return `deleted ${auditLog.entityType.toLowerCase()} "${
        auditLog.entityTitle
      }"`;
    case "COPY":
      return `copied ${auditLog.entityType.toLowerCase()} "${
        auditLog.entityTitle
      }"`;
    default:
      return `unknown action!`;
  }
}
