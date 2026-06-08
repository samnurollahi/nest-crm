import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('/register')
  regitserUser(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
}
