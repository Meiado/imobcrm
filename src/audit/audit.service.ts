import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogDto } from './dto/audit-log.dto';

@Injectable()
export class AuditService {
    constructor(private readonly prismaService: PrismaService) {}

    async auditAction(auditLogDto: AuditLogDto) {
        return this.prismaService.auditLog.create({
            data: auditLogDto
        });
    }
}

