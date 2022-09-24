import { AutoMap } from '@automapper/classes';
import { BaseDTO } from '../../base/base.dto';
export class FoodCategoryDTO extends BaseDTO {
  @AutoMap()
  name: string;
}
