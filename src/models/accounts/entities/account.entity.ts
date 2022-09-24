import { AutoMap } from '@automapper/classes';
import { StatusEnum } from 'src/common/enums/status.enum';
import { BaseEntity } from 'src/models/base/base.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { KitchenEntity } from 'src/models/kitchens/entities/kitchens.entity';
import { ProfileEntity } from 'src/models/profiles/entities/profile.entity';
import { RoleEntity } from 'src/models/roles/entities/role.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'accounts' })
export class AccountEntity extends BaseEntity {
  @Column({ unique: true })
  @AutoMap()
  phone: string;

  @Column()
  @AutoMap()
  password: string;

  @Column({ default: StatusEnum.IN_ACTIVE })
  @AutoMap()
  status: string;

  @Column({ nullable: true })
  @AutoMap()
  refreshToken: string;

  @Column({ nullable: true })
  @AutoMap()
  deviceToken: string;

  @Column('boolean', { default: false })
  public confirmedVerify: boolean;

  @Column('integer', {
    name: 'codeVerify',
    nullable: true,
  })
  public codeVerify: number;

  @Column('datetime', {
    name: 'dateExpiredVerifyCode',
    nullable: true,
  })
  public dateExpiredVerifyCode: Date;

  @AutoMap(() => CustomerEntity)
  @OneToOne(() => CustomerEntity, (customer) => customer.account, {
    onDelete: 'CASCADE',
  })
  customer: CustomerEntity;

  @AutoMap(() => KitchenEntity)
  @OneToOne(() => KitchenEntity, (kitchen) => kitchen.account, {
    onDelete: 'CASCADE',
  })
  kitchen: KitchenEntity;

  @AutoMap(() => RoleEntity)
  @ManyToOne(() => RoleEntity, (role) => role.accounts)
  role: RoleEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.account)
  @AutoMap(() => ProfileEntity)
  profile: ProfileEntity;
}
