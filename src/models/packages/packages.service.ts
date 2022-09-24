import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { PackageEntity } from './entities/packages.entity';
import { PackageDTO } from './dto/packages.dto';
import { StatusEnum } from 'src/common/enums/status.enum';

@Injectable()
export class PackageService extends BaseService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packagesRepository: Repository<PackageEntity>,
  ) {
    super(packagesRepository);
  }

  async listAllPackage(): Promise<PackageEntity[]> {
    return await this.packagesRepository.find();
  }

  async listPackageStatus(): Promise<PackageEntity[]> {
    return await this.packagesRepository.find({
      where: { status: StatusEnum.ACTIVE },
    });
  }

  async createPackage(dto: PackageDTO): Promise<string> {
    try {
      await this.packagesRepository.save({
        startSale: dto.startSale,
        endSale: dto.endSale,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        totalDate: dto.totalDate,
        totalFood: dto.totalFood,
        totalMeal: dto.totalMeal,
        totalStation: dto.totalStation,
      });
      return 'Create package successfull';
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePackage(id: string, dto: PackageDTO): Promise<string> {
    const packageId = await this.packagesRepository.findOne({
      where: { id: id },
    });
    if (!packageId) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      try {
        await this.packagesRepository.update(
          { id: id },
          {
            startSale: dto.startSale,
            endSale: dto.endSale,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            totalDate: dto.totalDate,
            totalMeal: dto.totalMeal,
            totalFood: dto.totalFood,
            totalStation: dto.totalStation,
          },
        );
        return 'Update package successfull';
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateStatus(id: string): Promise<string> {
    const packages = await this.packagesRepository.findOne({
      where: { id: id },
    });
    if (!packages) {
      throw new HttpException(
        `Package Id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      if (packages.status == StatusEnum.WAITING) {
        await this.packagesRepository.update(
          { id: id },
          {
            status: StatusEnum.ACTIVE,
          },
        );
        return 'Package is active';
      }
    }
  }

  async deletePackage(id: string): Promise<string> {
    const packages = await this.packagesRepository.findOne({
      where: { id: id },
    });
    if (packages) {
      await this.packagesRepository
        .createQueryBuilder()
        .delete()
        .from(PackageEntity)
        .where('id = :id', { id: id })
        .execute();
      return `Delete Successfully : ${id}`;
    } else {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
