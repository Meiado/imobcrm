import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuditModule } from '../infrastructure/audit/audit.module';
import { LeadsModule } from './leads/leads.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { VisitsModule } from './visits/visits.module';
import { ProposalsModule } from './proposals/proposals.module';
import { CommissionsModule } from './commissions/commissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule, 
    AuditModule, 
    LeadsModule, 
    OpportunitiesModule, VisitsModule, ProposalsModule, CommissionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
