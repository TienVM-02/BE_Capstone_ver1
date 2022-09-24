import { AutoMap } from '@automapper/classes';
import { IsInt } from 'class-validator';
import { BaseEntity } from 'src/models/base/base.entity';
import { PackageEntity } from 'src/models/packages/entities/packages.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'package_item' })
export class PackageItemEntity extends BaseEntity {
  @Column()
  @AutoMap()
  startDate: string;

  @Column()
  @AutoMap()
  endDate: string;

  @Column()
  @AutoMap()
  @IsInt()
  maxFood: number;

  @Column()
  @AutoMap()
  @IsInt()
  maxAmount: number;

  @AutoMap(() => PackageEntity)
  @ManyToOne(() => PackageEntity, (packages) => packages.packageItem)
  packages: PackageEntity;
}
