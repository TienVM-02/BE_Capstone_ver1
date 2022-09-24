import { Body, Controller, Get, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { MapInterceptor } from '@automapper/nestjs';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileDTO } from './dto/profile.dto';
import { GetUser } from '../../decorators/user.decorator';
import { AccountEntity } from '../accounts/entities/account.entity';

@Controller('profiles')
@ApiTags('profiles')
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly profilesService: ProfileService) {}

  @Get('/my')
  @UseInterceptors(MapInterceptor(ProfileEntity, ProfileDTO))
  getMe(@GetUser() user: AccountEntity): ProfileEntity {
    return user.profile;
  }

  @Put()
  @UseInterceptors(MapInterceptor(ProfileEntity, ProfileDTO))
  async updateProfile(
    @Body() dto: ProfileDTO,
    @GetUser() user: AccountEntity,
  ): Promise<ProfileEntity> {
    return await this.profilesService.updateProfile(dto, user.id);
  }
}
