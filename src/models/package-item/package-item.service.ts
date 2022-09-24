import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { PackageItemDTO } from './dto/package-item.dto';
import { PackageItemEntity } from './entities/package-item.entity';

@Injectable()
export class PackageItemService extends BaseService<PackageItemEntity> {
  constructor(
    @InjectRepository(PackageItemEntity)
    private readonly packageItemRepository: Repository<PackageItemEntity>,
  ) {
    super(packageItemRepository);
  }

  async getAllPackageItem(): Promise<PackageItemEntity[]> {
    return await this.packageItemRepository.find();
  }

  async deletePackageItem(id: string): Promise<string> {
    const item = await this.packageItemRepository.findOne({
      where: { id: id },
    });
    if (!item) {
      throw new HttpException(
        `PackageItem id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      try {
        await this.packageItemRepository
          .createQueryBuilder()
          .delete()
          .from(PackageItemEntity)
          .where('id = :id', { id: id })
          .execute();
        return 'Package item deleted';
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updatePackageItem(id: string, dto: PackageItemDTO): Promise<string> {
    const item = await this.packageItemRepository.findOne({
      where: { id: id },
    });

    if (!item) {
      throw new HttpException(
        `Package item ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      try {
        await this.packageItemRepository.update(
          { id: id },
          {
            startDate: dto.startDate,
            endDate: dto.endDate,
            maxFood: dto.maxFood,
            maxAmount: dto.maxAmount,
          },
        );
        return 'Package item updated';
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
