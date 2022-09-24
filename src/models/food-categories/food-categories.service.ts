import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { FoodCategoryEntity } from './entities/food-categories.entity';
import { UpdateFoodCategoryDTO } from './dto/update-food-category';

@Injectable()
export class FoodCategoriesService extends BaseService<FoodCategoryEntity> {
  constructor(
    @InjectRepository(FoodCategoryEntity)
    private readonly categoriesRepository: Repository<FoodCategoryEntity>,
  ) {
    super(categoriesRepository);
  }

  async getCategories(): Promise<FoodCategoryEntity[]> {
    return await this.categoriesRepository.find();
  }

  async updateCategory(
    id: string,
    data: UpdateFoodCategoryDTO,
  ): Promise<string> {
    const cateId = await this.categoriesRepository.findOne({
      where: { id: id },
    });
    if (!cateId) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      await this.save({ id: id, name: data.name });
      return `Update Sucessfully ${id}`;
    }
  }

  async deleteCategoryById(id: string): Promise<string> {
    try {
      const cateId = await this.categoriesRepository.findOne({
        where: { id: id },
      });
      if (!cateId) {
        throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
      } else {
        await this.deleteById(id);
        return `Delete Successfully : ${id}`;
      }
    } catch (error) {
      throw new HttpException(
        'Cannot delete (Get Foreign Key)',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
