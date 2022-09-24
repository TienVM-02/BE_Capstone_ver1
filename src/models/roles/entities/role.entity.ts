import { AutoMap } from '@automapper/classes';
import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { BaseEntity } from 'src/models/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name: string;

  @OneToMany(() => AccountEntity, (account) => account.role)
  accounts: AccountEntity[];
}
