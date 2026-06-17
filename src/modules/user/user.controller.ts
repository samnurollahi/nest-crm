import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from 'src/common/guards/auth.guard';
import { Role } from 'src/common/guards/role.guard';
import type { UserPayload } from 'src/types/user-payload';
import { UserRole } from 'src/types/user-role';
import { AddEmployeeDto } from './dto/addEmployee.dto';
import { UserService } from './user.service';

@UseGuards(Auth, Role)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @Post('')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'اضافه کردن کارمند' })
  addEmployee(
    @Body() addEmployeeDto: AddEmployeeDto,
    @User() user: UserPayload,
  ) {
    return this.userService.addEmployee(addEmployeeDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.OWNER, UserRole.MANAGER)
  @ApiBearerAuth('JWT')
  removeEmployee(@Param('id') id: string, @User() user: UserPayload) {
    return this.userService.removeEmployee(id, user);
  }
}
