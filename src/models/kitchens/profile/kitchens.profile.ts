import { Injectable } from '@nestjs/common';
import {
  MappingProfile,
  createMap,
  Mapper,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { KitchenEntity } from '../entities/kitchens.entity';
import { KitchenDTO } from '../dto/kitchen.dto';

@Injectable()
export class KitchenProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        KitchenEntity,
        KitchenDTO,
        forMember(
          (destination) => destination.profile,
          mapFrom((s) => s.account.profile),
        ),
      );
      createMap(mapper, KitchenEntity, KitchenDTO);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
