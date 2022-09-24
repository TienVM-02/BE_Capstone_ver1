import { Injectable } from '@nestjs/common';
import { MappingProfile, createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { FoodCategoryEntity } from '../entities/food-categories.entity';
import { FoodCategoryDTO } from '../dto/food-category.dto';

@Injectable()
export class FoodCategoriesProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, FoodCategoryEntity, FoodCategoryDTO);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
