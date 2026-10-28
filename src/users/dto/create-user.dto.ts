import { UserRole } from '../../generated/prisma/client';

export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
    readonly creci: string | null;
}
