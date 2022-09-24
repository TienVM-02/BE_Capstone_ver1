import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShipperEntity } from './entities/shippers.entity';
import { ShippersController } from './shippers.controller';
import { ShippersService } from './shippers.service';
import { ShipperProfile } from './profile/shippers.profile';

@Module({
  imports: [TypeOrmModule.forFeature([ShipperEntity])],
  controllers: [ShippersController],
  providers: [ShippersService, ShipperProfile],
  exports: [ShippersService],
})
export class ShippersModule {}
