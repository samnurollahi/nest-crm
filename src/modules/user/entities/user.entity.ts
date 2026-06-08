import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, Index, ValueTransformer } from 'typeorm';
import * as bcrypt from 'bcrypt';

const passwordTransformer: ValueTransformer = {
  from: (val: any) => val,
  to: (val: any) => {
    if (!val) return val;
    return bcrypt.hashSync(val, 10);
  },
};

@Entity()
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    transformer: passwordTransformer,
  })
  password: string;
}
