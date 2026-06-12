import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyEntity } from './entities/company.entity';
import { CompanyCreatedHandler } from './events/listeners/company-created.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), UserModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyCreatedHandler],
})
export class CompanyModule {}
