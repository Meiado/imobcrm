import { IsDecimal, IsEnum, IsOptional, IsString } from "class-validator";
import { OpportunityStage } from "../../../infrastructure/persistance/generated/prisma/enums";

export class CreateOpportunityDto {
    @IsString()
    leadId: string;
    @IsString()
    brokerId: string;
    @IsEnum(OpportunityStage)
    stage: OpportunityStage;
    @IsDecimal()
    expectedValue: number;
    @IsOptional()
    @IsString()
    lossReason?: string;
}
