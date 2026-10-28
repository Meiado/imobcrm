import { IsDecimal, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { ProposalStatus, PaymentType } from "../../../infrastructure/persistance/generated/prisma/enums";

export class CreateProposalDto {
    @IsUUID()
    opportunityId: string;
    @IsDecimal()
    value: number;
    @IsEnum(PaymentType)
    paymentType: PaymentType;
    @IsOptional()
    @IsString()
    conditions?: string;
    @IsEnum(ProposalStatus)
    status: ProposalStatus;
    @IsOptional()
    @IsUUID()
    discountApprovedBy?: string;
    @IsOptional()
    @IsDecimal()
    discountPercentage?: number;
}
