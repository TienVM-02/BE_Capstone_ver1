import { MappingProfile, createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ProfileDTO } from '../dto/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

@Injectable()
export class ProfileProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => createMap(mapper, ProfileEntity, ProfileDTO);
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
