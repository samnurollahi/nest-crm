import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'sam.nurollahi@gmail.com',
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}
