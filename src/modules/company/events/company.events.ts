import { BaseEvnet } from '../../../common/base.event';
import { CompanyEntity } from '../entities/company.entity';

export class companyCreateEvent extends BaseEvnet {
  constructor(
    public company: CompanyEntity,
    public password,
  ) {
    super('company.created');
  }
}
