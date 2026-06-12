import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserService } from 'src/modules/user/user.service';
import { UserRole } from 'src/types/user-role';
import { companyCreateEvent } from '../company.events';

@Injectable()
export class CompanyCreatedHandler {
  constructor(private readonly userService: UserService) {}

  @OnEvent('company.created', { async: false })
  async handle(event: companyCreateEvent) {
    await this.userService.register({
      name: event.company.name,
      email: event.company.email,
      role: UserRole.OWNER,
      companyId: event.company.id,
      password: event.password,
    });
  }
}
