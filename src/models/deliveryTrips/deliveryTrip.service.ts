import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { DeliveryTripEntity } from './entities/deliveryTrip.entity';

@Injectable()
export class DeliveryTripService extends BaseService<DeliveryTripEntity> {
  constructor(
    @InjectRepository(DeliveryTripEntity)
    private readonly deliveryTripRepository: Repository<DeliveryTripEntity>,
  ) {
    super(deliveryTripRepository);
  }

  async getAllDeliveryTrip(): Promise<DeliveryTripEntity[]> {
    return await this.deliveryTripRepository.find();
  }

  // async createDeliveryTrip(): Promise<DeliveryTripEntity> {
  //   try {
  //     return await this.deliveryTripRepository.save({

  //     })
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
