import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { ShipperEntity } from './entities/shippers.entity';
import { ShipperDTO } from './dto/shippers.dto';
import { StatusEnum } from 'src/common/enums/status.enum';

@Injectable()
export class ShippersService extends BaseService<ShipperEntity> {
  constructor(
    @InjectRepository(ShipperEntity)
    private readonly shippersRepository: Repository<ShipperEntity>,
  ) {
    super(shippersRepository);
  }

  async getAllShippers(): Promise<ShipperEntity[]> {
    return await this.shippersRepository.find();
  }

  async createShipper(dto: ShipperDTO): Promise<ShipperEntity> {
    try {
      return await this.shippersRepository.save({
        noPlate: dto.noPlate,
        vehicleType: dto.vehicleType,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteShipper(id: string): Promise<string> {
    const shipperId = await this.shippersRepository.findOne({
      where: { id: id },
    });
    if (shipperId == null) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      try {
        await this.shippersRepository.update(
          { id: id },
          { status: StatusEnum.IN_ACTIVE },
        );
        return 'Shipper is inactive';
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateShipper(id: string, dto: ShipperDTO): Promise<string> {
    const shipperId = await this.shippersRepository.findOne({
      where: { id: id },
    });
    if (shipperId == null) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      try {
        await this.shippersRepository.update(
          { id: id },
          {
            noPlate: dto.noPlate,
            vehicleType: dto.vehicleType,
          },
        );
        return 'Update shipper successful';
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
