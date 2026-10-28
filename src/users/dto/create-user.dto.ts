import { UserRole } from '../../generated/prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;
    @IsEnum(UserRole)
    role: UserRole;
    @IsOptional()
    @IsString()
    creci?: string;
}
