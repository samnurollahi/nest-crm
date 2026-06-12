import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { LeadStatus } from 'src/types/lead-status';

export class CreateLeadsDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  @ApiProperty({ example: 'nikjo' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  @IsEmail()
  @ApiProperty({ example: 'nikjo@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(LeadStatus)
  @ApiProperty({ example: LeadStatus.NEW })
  status: LeadStatus;
}
