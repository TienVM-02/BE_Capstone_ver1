import { AutoMap } from '@automapper/classes';
import { BaseDTO } from 'src/models/base/base.dto';

export class KitchenInfoDTO extends BaseDTO {
  @AutoMap()
  address: string;

  @AutoMap()
  ability: string;
}
