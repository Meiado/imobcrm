import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuditService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService
    ) {}

}

