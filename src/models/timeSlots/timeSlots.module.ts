import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TimeSlotEntity } from './entities/timeSlots.entity';
import { TimeSlotsController } from './timeSlots.controller';
import { TimeSlotsService } from './timeSlots.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlotEntity])],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
  exports: [TimeSlotsService],
})
export class TimeSlotsModule {}
