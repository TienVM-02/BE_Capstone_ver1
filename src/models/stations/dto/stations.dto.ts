import { AutoMap } from '@automapper/classes';
import { BaseDTO } from '../../base/base.dto';

export class StationDTO extends BaseDTO {
  @AutoMap()
  name: string;

  @AutoMap()
  address: string;

  @AutoMap()
  phone: number;

  @AutoMap()
  openTime: string;

  @AutoMap()
  closeTime: string;

  @AutoMap()
  status: string;
}
