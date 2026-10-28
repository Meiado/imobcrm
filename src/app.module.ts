import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuditModule } from './audit/audit.module';
import { LeadsModule } from './leads/leads.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule, 
    AuditModule, 
    LeadsModule, 
    OpportunitiesModule, VisitsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
