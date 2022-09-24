import { AutoMap } from '@automapper/classes';
import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { BaseEntity } from 'src/models/base/base.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'kitchens' })
export class KitchenEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @AutoMap()
  address: string;

  @Column()
  @AutoMap()
  ability: string;

  @AutoMap(() => AccountEntity)
  @OneToOne(() => AccountEntity, (account) => account.kitchen, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'id' })
  account: AccountEntity;
}
