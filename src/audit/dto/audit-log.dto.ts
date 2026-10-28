import { AuditLogAction } from "../../generated/prisma/enums";
import { JsonObject } from "../../generated/prisma/internal/prismaNamespaceBrowser";

export class AuditLogDto {
    userId: string;
    action: AuditLogAction;
    entity: string;
    entityId: string;
    oldValue?: JsonObject;
    newValue?: JsonObject;
}