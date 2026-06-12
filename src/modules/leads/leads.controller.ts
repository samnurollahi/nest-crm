import { Controller, Post, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/guards/auth.guard';
import { Role } from 'src/common/guards/role.guard';
import { LeadsService } from './leads.service';

@UseGuards(Auth, Role)
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post('createLead')
  createLead() {}
}
