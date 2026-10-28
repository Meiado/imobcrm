import { LeadSource } from "../../generated/prisma/enums";

export class CreateLeadDto {
    name: string;
    email: string;
    phone?: string;
    source: LeadSource;
    notes?: string;
}
