import { AutoMap } from '@automapper/classes';
import { ProfileDTO } from 'src/models/profiles/dto/profile.dto';
import { BaseDTO } from '../../base/base.dto';

export class KitchenDTO extends BaseDTO {
  @AutoMap()
  address: string;

  @AutoMap()
  ability: string;

  @AutoMap(() => ProfileDTO)
  profile: ProfileDTO;
}
