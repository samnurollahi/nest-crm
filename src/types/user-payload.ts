import { UserRole } from './user-role';

export interface UserPayload {
  userId: string;
  user: { email: string; role: UserRole };
}
