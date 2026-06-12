import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { companyCreateEvent } from './events/company.events';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepo: Repository<CompanyEntity>,
    private readonly evnetEmitter: EventEmitter2,
  ) {}

  async registerCompany(createCompanyDto: CreateCompanyDto) {
    const exists = await this.companyRepo.findOne({
      where: { email: createCompanyDto.email },
    });

    if (exists) {
      throw new BadRequestException('Company already exists');
    }

    const company = this.companyRepo.create(createCompanyDto);
    const saved = await this.companyRepo.save(company);

    this.evnetEmitter.emit(
      'company.created',
      new companyCreateEvent(saved, createCompanyDto.password),
    );

    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      createdAt: saved.createdAt,
    };
  }
}
