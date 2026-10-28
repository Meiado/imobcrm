import { OpportunityStage } from "../../generated/prisma/enums";

export class CreateOpportunityDto {
    leadId: string;
    brokerId: string;
    stage: OpportunityStage;
    expectedValue: number;
    lossReason?: string;
}
