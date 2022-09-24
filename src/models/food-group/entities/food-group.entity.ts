import { AutoMap } from '@automapper/classes';
import { StatusEnum } from 'src/common/enums/status.enum';
import { BaseEntity } from 'src/models/base/base.entity';
import { FoodEntity } from 'src/models/foods/entities/foods.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'food_group' })
export class FoodGroupEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  totalFood: number;

  @Column({ default: StatusEnum.WAITING })
  @AutoMap()
  status: string;

  @AutoMap(() => [FoodEntity])
  @ManyToMany(() => FoodEntity, (food) => food.foodGroups)
  @JoinTable({ name: 'food_group_item' })
  foods: FoodEntity[];
}
