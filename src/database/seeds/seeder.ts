import { Injectable } from '@nestjs/common';
import { RolesSeederService } from './roles/roles.service';

@Injectable()
export class Seeder {
  constructor(private readonly roleService: RolesSeederService) {}

  async insertRoles(): Promise<void> {
    return await this.roleService.createRole();
  }
}
