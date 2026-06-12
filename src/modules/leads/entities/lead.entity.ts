import { BaseEntity } from 'src/common/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { LeadStatus } from 'src/types/lead-status';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
export class LeadEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @ManyToOne(() => CompanyEntity)
  company: CompanyEntity;
}
