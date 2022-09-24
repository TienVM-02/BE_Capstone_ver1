import { RoleEntity } from './entities/role.entity';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleProfile } from './profile/role.profile';
import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RolesController],
  providers: [RolesService, RoleProfile],
  exports: [RolesService],
})
export class RolesModule {}
