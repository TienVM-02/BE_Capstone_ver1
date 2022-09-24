import { Injectable } from '@nestjs/common';
import { MappingProfile, createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { DeliveryTripEntity } from '../entities/deliveryTrip.entity';
import { DeliveryTripDTO } from '../dto/deliveryTrip.dto';
@Injectable()
export class DeliveryTripProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, DeliveryTripEntity, DeliveryTripDTO);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
