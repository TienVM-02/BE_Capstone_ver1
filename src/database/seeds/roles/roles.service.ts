import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/models/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { getDataRole } from './data';

@Injectable()
export class RolesSeederService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  async createRole(): Promise<void> {
    const data = getDataRole();
    const rolesPromise: Promise<RoleEntity>[] = [];
    for (const item of data) {
      const itemPromise = this.roleRepository.save(item);
      rolesPromise.push(itemPromise);
    }
    return Promise.all(rolesPromise)
      .then(() => {
        console.info('create data roles success');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
