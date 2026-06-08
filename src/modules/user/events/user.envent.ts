import { BaseEvnet } from 'src/common/base.event';

export class RegisterUserEvnet extends BaseEvnet {
  constructor(public userId: string) {
    super('user.register');
  }
}
