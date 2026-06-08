import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { companyCreateEvent } from '../company.events';

@Injectable()
export class CompanyCreatedHandler {
  @OnEvent('company.created', { async: true })
  handle(event: companyCreateEvent) {
    //! send email ,...
  }
}
