import { BaseEvnet } from '../../../common/base.event';

export class companyCreateEvent extends BaseEvnet {
  constructor(public companyId: string) {
    super('company.created');
  }
}
