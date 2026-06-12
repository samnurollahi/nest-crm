import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUser(loginDto.email, true);
    if (!user) throw new BadRequestException();

    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) throw new BadRequestException();

    const token = await this.jwtService.sign({
      userId: user.id,
      user: { email: user.email, role: user.role },
    });
    return {
      token,
      msg: 'login',
    };
  }
}
