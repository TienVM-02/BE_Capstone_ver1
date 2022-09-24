import { RoleEntity } from './entities/role.entity';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { MapInterceptor } from '@automapper/nestjs';
import { Public } from 'src/decorators/public.decorator';
import { RoleDTO } from './dto/role.dto';

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Public()
  @UseInterceptors(MapInterceptor(RoleEntity, RoleDTO, { isArray: true }))
  getAll(): Promise<RoleEntity[]> {
    return this.rolesService.query();
  }
}
