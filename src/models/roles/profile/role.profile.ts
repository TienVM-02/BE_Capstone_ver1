import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => createMap(mapper, RoleEntity, RoleDTO);
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
