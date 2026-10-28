import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { PrismaModule } from '../persistance/prisma/prisma.module';
import { UsersService } from '../../application/users/users.service';

@Module({
  imports: [PrismaModule],
  providers: [AuditService, UsersService]
})
export class AuditModule {}
