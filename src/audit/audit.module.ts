import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [PrismaModule],
  providers: [AuditService, UsersService]
})
export class AuditModule {}
