import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { TimeSlotEntity } from './entities/timeSlots.entity';
import { TimeSlotDTO } from './dto/timeSlot.dto';

@Injectable()
export class TimeSlotsService extends BaseService<TimeSlotEntity> {
  constructor(
    @InjectRepository(TimeSlotEntity)
    private readonly timeSlotsRepository: Repository<TimeSlotEntity>,
  ) {
    super(timeSlotsRepository);
  }

  async getAllTimeSlot(): Promise<TimeSlotEntity[]> {
    return await this.timeSlotsRepository.find();
  }

  async getTimeSlotFlag(flag: number): Promise<TimeSlotEntity[]> {
    return await this.timeSlotsRepository.find({
      where: {
        flag: flag,
      },
    });
  }

  async createTimeSlot(dto: TimeSlotDTO): Promise<string> {
    try {
      await this.timeSlotsRepository.save({
        startTime: dto.startTime,
        endTime: dto.endTime,
        flag: dto.flag,
      });
      return 'Create time slot successful';
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTimeSlot(id: string): Promise<string> {
    const timeSlot = await this.timeSlotsRepository.findOne({
      where: { id: id },
    });
    if (timeSlot == null) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      try {
        await this.timeSlotsRepository
          .createQueryBuilder()
          .delete()
          .from(TimeSlotEntity)
          .where('id = :id', { id: id })
          .execute();
        return `Delete Successfully : ${id}`;
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateTimeSlot(id: string, dto: TimeSlotDTO): Promise<string> {
    const timeSlot = await this.timeSlotsRepository.findOne({
      where: { id: id },
    });
    if (timeSlot) {
      await this.timeSlotsRepository.update(
        { id: id },
        {
          startTime: dto.startTime,
          endTime: dto.endTime,
          flag: dto.flag,
        },
      );
      return 'Update successfull';
    } else {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
