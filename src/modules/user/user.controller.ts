import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AddEmployeeDto } from './dto/addEmployee.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('addEmployee')
  addEmployee(@Body() addEmployeeDto: AddEmployeeDto) {
    return this.userService.addEmployee(addEmployeeDto);
  }
}
