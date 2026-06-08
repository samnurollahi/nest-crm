import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  register(registerDto: RegisterDto) {}
}
