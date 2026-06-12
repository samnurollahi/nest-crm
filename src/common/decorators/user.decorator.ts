import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/types/user-payload';

export const User = createParamDecorator(
  (data, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    return request['user'] as UserPayload;
  },
);
