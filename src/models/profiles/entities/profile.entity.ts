import { AutoMap } from '@automapper/classes';
import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { BaseEntity } from 'src/models/base/base.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class ProfileEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @AutoMap()
  fullName: string;

  @Column()
  @AutoMap()
  DOB: Date;

  @Column({ nullable: true })
  @AutoMap()
  avatar: string;

  @Column({ unique: true })
  @AutoMap()
  email: string;

  @OneToOne(() => AccountEntity, (account) => account.profile)
  @JoinColumn({ name: 'id' })
  account: AccountEntity;
}
