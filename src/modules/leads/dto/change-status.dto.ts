import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { LeadStatus } from 'src/types/lead-status';

export class ChangeStatusDto {
  @ApiProperty({ enum: LeadStatus, default: LeadStatus.QUALIFIED })
  @IsString()
  @IsEnum(LeadStatus)
  status: LeadStatus;
}
