import { AutoMap } from '@automapper/classes';
import { BaseDTO } from 'src/models/base/base.dto';
import { ProfileDTO } from 'src/models/profiles/dto/profile.dto';

export class CustomerDTO extends BaseDTO {
  @AutoMap()
  address: string;

  @AutoMap(() => ProfileDTO)
  profile: ProfileDTO;
}
