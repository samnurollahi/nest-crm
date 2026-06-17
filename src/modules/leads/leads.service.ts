import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadStatus } from 'src/types/lead-status';
import { UserPayload } from 'src/types/user-payload';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateLeadsDto } from './dto/create-leads.dto';
import { LeadEntity } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(LeadEntity)
    private readonly leadRepo: Repository<LeadEntity>,
    private readonly userService: UserService,
  ) {}

  async getAll(
    user: UserPayload,
    page: number,
    status: LeadStatus | undefined,
  ) {
    const take = 10;
    let leads;

    if (page <= 0) {
      page = 1;
    }

    const companyId = (
      await this.userService.findUser(user.user.email, false, true)
    )?.company.id;

    if (status) {
      leads = await this.leadRepo.find({
        skip: (page - 1) * take,
        take,
        order: { updatedAt: 'DESC' },
        where: {
          company: { id: companyId },
          status,
        },
      });
    } else {
      leads = await this.leadRepo.find({
        skip: (page - 1) * take,
        take,
        order: { updatedAt: 'DESC' },
        where: {
          company: { id: companyId },
        },
      });
    }

    return {
      leads,
    };
  }

  async create(createLeadDto: CreateLeadsDto, user: UserPayload) {
    let created, saved;
    const company = (
      await this.userService.findUser(user.user.email, false, true)
    )?.company;

    try {
      created = this.leadRepo.create({
        ...createLeadDto,
        company: { id: company?.id },
      });
      saved = await this.leadRepo.save(created);
    } catch (error) {
      if (error && error['code'] == '23505') {
        throw new BadRequestException('leads already exists');
      }
    }

    return {
      name: saved.name,
      status: saved.status,
    };
  }

  async changeStatus(leadId: string, changeStatusDto: ChangeStatusDto) {
    await this.leadRepo.update(
      { id: leadId },
      { status: changeStatusDto.status },
    );

    return {};
  }
}
