import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
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
  @Length(0, 1_000)
  description?: string;

  @ApiProperty({})
  @IsString()
  @Length(0, 255)
  @IsNotEmpty()
  password: string;
}
