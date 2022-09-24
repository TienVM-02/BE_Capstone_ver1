import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { BaseService } from 'src/models/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {
    super(rolesRepository);
  }
}
