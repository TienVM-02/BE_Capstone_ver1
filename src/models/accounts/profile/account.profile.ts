import { AccountEntity } from '../entities/account.entity';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { AccountInfoDTO } from '../dto/account-info..dto';
import { AccountDTO } from '../dto/accounts.dto';

@Injectable()
export class AccountProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, AccountEntity, AccountDTO);
      createMap(mapper, AccountEntity, AccountInfoDTO);
    };
  }
}
