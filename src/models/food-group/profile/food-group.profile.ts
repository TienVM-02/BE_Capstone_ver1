import { Injectable } from '@nestjs/common';
import { MappingProfile, createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FoodGroupDTO } from '../dto/food-group.dto';
import { FoodGroupEntity } from '../entities/food-group.entity';

@Injectable()
export class FoodGroupProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, FoodGroupEntity, FoodGroupDTO);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
