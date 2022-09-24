import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CustomerDTO } from '../dto/customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        CustomerEntity,
        CustomerDTO,
        forMember(
          (destination) => destination.profile,
          mapFrom((s) => s.account.profile),
        ),
      );
      createMap(mapper, CustomerEntity, CustomerDTO);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
