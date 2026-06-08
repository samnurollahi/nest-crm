import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRegisterHandler } from './events/listeners/user-register.handler';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRegisterHandler],
  exports: [UserService],
})
export class UserModule {}
