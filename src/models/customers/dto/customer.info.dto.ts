import { AutoMap } from '@automapper/classes';
import { BaseDTO } from 'src/models/base/base.dto';

export class CustomerInfoDTO extends BaseDTO {
  @AutoMap()
  address: string;
}
