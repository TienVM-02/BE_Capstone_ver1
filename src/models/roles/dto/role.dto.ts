import { AutoMap } from '@automapper/classes';
import { BaseDTO } from 'src/models/base/base.dto';

export class RoleDTO extends BaseDTO {
  @AutoMap()
  name: string;
}
