import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleEntity } from 'src/models/roles/entities/role.entity';
import { RolesSeederService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RolesSeederService],
  exports: [RolesSeederService],
})
export class RolesSeederModule {}
