import { RoleDTO } from './../../roles/dto/role.dto';
import { BaseDTO } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';
import { ProfileDTO } from '../../profiles/dto/profile.dto';
import { CustomerInfoDTO } from 'src/models/customers/dto/customer.info.dto';
import { KitchenInfoDTO } from 'src/models/kitchens/dto/kitchen.info.dto';

export class AccountInfoDTO extends BaseDTO {
  @AutoMap()
  phone: string;
  @AutoMap()
  status: string;
  @AutoMap(() => ProfileDTO)
  profile: ProfileDTO;
  @AutoMap(() => RoleDTO)
  role: RoleDTO;
  @AutoMap(() => CustomerInfoDTO)
  customer: CustomerInfoDTO;
  @AutoMap(() => KitchenInfoDTO)
  kitchen: KitchenInfoDTO;
}
