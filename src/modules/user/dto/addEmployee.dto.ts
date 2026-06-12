import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/types/user-role';

export class AddEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'myTestEamil@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  password: string;

  @IsString()
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({
    enum: ['staff', 'manager'],
    default: 'staff',
  })
  role: UserRole = UserRole.STAFF;
}
