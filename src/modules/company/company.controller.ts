import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  registerCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.registerCompany(createCompanyDto);
  }
}
