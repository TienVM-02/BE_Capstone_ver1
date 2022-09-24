import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DeliveryTripEntity } from './entities/deliveryTrip.entity';
import { DeliveryTripProfile } from './profile/deliveryTrip.profile';
import { StationsModule } from '../stations/stations.module';
import { DeliveryTripController } from './deliveryTrip.controller';
import { DeliveryTripService } from './deliveryTrip.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryTripEntity]), StationsModule],
  controllers: [DeliveryTripController],
  providers: [DeliveryTripService, DeliveryTripProfile],
  exports: [DeliveryTripService],
})
export class DeliveryTripModule {}
