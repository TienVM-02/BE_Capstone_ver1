import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StationEntity } from './entities/stations.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { StationProfile } from './profile/station.profile';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationsController],
  providers: [StationsService, StationProfile],
  exports: [StationsService],
})
export class StationsModule {}
