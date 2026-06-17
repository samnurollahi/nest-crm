import * as bcrypt from 'bcrypt';
import { BaseEntity } from 'src/common/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserRole } from 'src/types/user-role';
import { Column, Entity, Index, ManyToOne, ValueTransformer } from 'typeorm';

const passwordTransformer: ValueTransformer = {
  from: (val: any) => val,
  to: (val: any) => {
    if (!val) return val;
    return bcrypt.hashSync(val, 10);
  },
};

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    transformer: passwordTransformer,
    select: false,
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role!: UserRole;

  @ManyToOne(() => CompanyEntity)
  company!: CompanyEntity;
}
