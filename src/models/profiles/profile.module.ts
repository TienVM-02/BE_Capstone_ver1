import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilesController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileProfile } from './profile/profile.profile';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfilesController],
  providers: [ProfileService, ProfileProfile],
  exports: [ProfileService],
})
export class ProfileModule {}
