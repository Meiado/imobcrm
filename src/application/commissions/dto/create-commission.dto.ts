import { IsDate, IsDecimal, IsEnum, IsUUID } from "class-validator";
import { CommissionStatus } from "../../../infrastructure/persistance/generated/prisma/enums";

export class CreateCommissionDto {
    @IsUUID()
    proposalId: string;
    @IsUUID()
    brokerId: string;
    @IsDecimal()
    amount: number;
    @IsDate()
    paidAt: Date;
    @IsEnum(CommissionStatus)
    status: CommissionStatus;
}
