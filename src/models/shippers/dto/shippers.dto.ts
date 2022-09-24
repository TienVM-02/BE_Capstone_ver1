import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '../../base/base.dto';
import { KitchenDTO } from 'src/models/kitchens/dto/kitchen.dto';

export class ShipperDTO extends BaseDTO {
  @ApiProperty()
  @AutoMap()
  noPlate: string;

  @ApiProperty()
  @AutoMap()
  vehicleType: string;

  @AutoMap(() => KitchenDTO)
  kitchen: KitchenDTO;
}
