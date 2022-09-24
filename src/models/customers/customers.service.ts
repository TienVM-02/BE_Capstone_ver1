import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class CustomersService extends BaseService<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {
    super(customerRepository);
  }
}
