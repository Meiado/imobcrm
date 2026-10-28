import { VisitStatus } from "../../generated/prisma/enums";
import { IsUUID, IsEnum, IsString, IsOptional, IsDate, IsInt } from "class-validator";

export class CreateVisitDto {
    @IsUUID()
    leadId: string;
    @IsUUID()
    brokerId: string;
    @IsUUID()
    opportunityId: string;
    @IsDate()
    scheduledAt: Date;
    @IsInt()
    durationMin: number;
    @IsEnum(VisitStatus)
    status: VisitStatus;
    @IsOptional()
    @IsString()
    feedback?: string;
}
