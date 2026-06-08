import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'sam.nurollahi@gmail.com',
  })
  @IsString()
  @Length(0, 255)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsString()
  @Length(0, 255)
  @IsNotEmpty()
  password: string;
}
