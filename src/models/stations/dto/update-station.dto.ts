import { PartialType } from '@nestjs/swagger';
import { CreateStationDTO } from './create-station.dto';

export class UpdateStationDTO extends PartialType(CreateStationDTO) {}
