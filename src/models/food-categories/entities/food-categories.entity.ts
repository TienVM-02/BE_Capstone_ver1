import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/models/base/base.entity';
import { FoodEntity } from 'src/models/foods/entities/foods.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'food_categories' })
export class FoodCategoryEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name: string;

  @AutoMap(() => FoodEntity)
  @OneToMany(() => FoodEntity, (food) => food.foodCategory)
  foods: FoodEntity[];
}
