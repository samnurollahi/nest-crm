import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RegisterUserEvnet } from '../user.envent';

@Injectable()
export class UserRegisterHandler {
  @OnEvent('user.register')
  handle(event: RegisterUserEvnet) {
    //! send welcome email
  }
}
