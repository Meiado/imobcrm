import { InteractionType } from "../../generated/prisma/enums";

export class CreateInteractionDto {
    leadId: string;
    userId: string;
    interactionType: InteractionType;
    content?: string;
}