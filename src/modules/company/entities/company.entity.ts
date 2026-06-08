import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class CompanyEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'text', default: '' })
  description: string;
}
