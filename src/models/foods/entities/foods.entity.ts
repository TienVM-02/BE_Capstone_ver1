import { AutoMap } from '@automapper/classes';
import { StatusEnum } from 'src/common/enums/status.enum';
import { BaseEntity } from 'src/models/base/base.entity';
import { FoodCategoryEntity } from 'src/models/food-categories/entities/food-categories.entity';
import { FoodGroupEntity } from 'src/models/food-group/entities/food-group.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'foods' })
export class FoodEntity extends BaseEntity {
  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  image: string;

  @Column({ default: StatusEnum.ACTIVE })
  @AutoMap()
  status: string;

  @AutoMap(() => FoodCategoryEntity)
  @ManyToOne(() => FoodCategoryEntity, (foodCategory) => foodCategory.foods)
  foodCategory: FoodCategoryEntity;

  @ManyToMany(() => FoodGroupEntity, (foodGroup) => foodGroup.foods)
  foodGroups: FoodGroupEntity[];
}
