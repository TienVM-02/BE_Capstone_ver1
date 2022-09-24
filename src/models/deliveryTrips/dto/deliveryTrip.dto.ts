import { AutoMap } from '@automapper/classes';
import { StationDTO } from 'src/models/stations/dto/stations.dto';
import { BaseDTO } from '../../base/base.dto';

export class DeliveryTripDTO extends BaseDTO {
  @AutoMap(() => StationDTO)
  station: StationDTO;
}
