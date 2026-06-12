import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [JwtModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
