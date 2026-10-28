import { AuditLogAction } from "../../persistance/generated/prisma/enums";
import { JsonObject } from "../../persistance/generated/prisma/internal/prismaNamespaceBrowser";

export class AuditLogDto {
    userId: string;
    action: AuditLogAction;
    entity: string;
    entityId: string;
    oldValue?: JsonObject;
    newValue?: JsonObject;
}