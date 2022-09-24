import { Column, Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/models/base/base.entity';
import { FoodEntity } from 'src/models/foods/entities/foods.entity';

@Entity({ name: 'images' })
export class ImageEntity extends BaseEntity {
  @AutoMap()
  @Column()
  url: string;

  // @ManyToOne(() => FoodEntity, (food) => food.images)
  // food: FoodEntity;
}
