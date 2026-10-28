import { IsUUID, IsEnum, IsString, IsOptional, } from "class-validator";
import { InteractionType } from "../../../infrastructure/persistance/generated/prisma/enums";

export class CreateInteractionDto {
    @IsUUID()
    leadId: string;
    @IsUUID()
    userId: string;
    @IsEnum(InteractionType)
    interactionType: InteractionType;
    @IsOptional()
    @IsString()
    content?: string;
}