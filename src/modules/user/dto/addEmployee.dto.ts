import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/types/user-role';

export class AddEmployeeDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole = UserRole.STAFF;
}
