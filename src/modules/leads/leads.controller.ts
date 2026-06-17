import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from 'src/common/guards/auth.guard';
import { Role } from 'src/common/guards/role.guard';
import { LeadStatus } from 'src/types/lead-status';
import type { UserPayload } from 'src/types/user-payload';
import { UserRole } from 'src/types/user-role';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateLeadsDto } from './dto/create-leads.dto';
import { LeadsService } from './leads.service';

@UseGuards(Auth, Role)
@ApiBearerAuth('JWT')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF)
  createLead(@Body() createLeadDto: CreateLeadsDto, @User() user: UserPayload) {
    return this.leadsService.create(createLeadDto, user);
  }

  @Get()
  @ApiQuery({ enum: LeadStatus, name: 'status' })
  @ApiQuery({ name: 'page', default: 1 })
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF)
  @UseInterceptors(CacheInterceptor)
  getAll(
    @User() user: UserPayload,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('status') status: LeadStatus | undefined,
  ) {
    return this.leadsService.getAll(user, page, status);
  }

  @Patch(':id/status')
  @ApiParam({ name: 'id', description: 'id of lead' })
  @Roles(UserRole.OWNER, UserRole.MANAGER, UserRole.STAFF)
  @UseInterceptors(CacheInterceptor)
  changeStatus(
    @Body() cahngeStatusDto: ChangeStatusDto,
    @Param('id') leadId: string,
  ) {
    return this.leadsService.changeStatus(leadId, cahngeStatusDto);
  }
}
