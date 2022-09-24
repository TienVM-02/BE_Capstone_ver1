import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { KitchenEntity } from './entities/kitchens.entity';

@Injectable()
export class KitchenService extends BaseService<KitchenEntity> {
  constructor(
    @InjectRepository(KitchenEntity)
    private readonly kitchensRepository: Repository<KitchenEntity>,
  ) {
    super(kitchensRepository);
  }
}
