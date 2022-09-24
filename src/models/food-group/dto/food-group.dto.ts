import { AutoMap } from '@automapper/classes';
import { FoodDTO } from 'src/models/foods/dto/food.dto';
import { BaseDTO } from '../../base/base.dto';

export class FoodGroupDTO extends BaseDTO {
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  totalFood: number;

  @AutoMap()
  status: string;

  @AutoMap(() => [FoodDTO])
  foods: FoodDTO[];
}
