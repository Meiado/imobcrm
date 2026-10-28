import { LeadSource } from "../../../infrastructure/persistance/generated/prisma/enums";
import { IsString, IsEnum, IsOptional } from "class-validator";

export class CreateLeadDto {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsOptional()
    @IsString()
    phone?: string;
    @IsEnum(LeadSource)
    source: LeadSource;
    @IsOptional()
    @IsString()
    notes?: string;
}
