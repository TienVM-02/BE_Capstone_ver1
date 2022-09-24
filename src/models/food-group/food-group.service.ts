import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { FoodGroupEntity } from './entities/food-group.entity';
import { CreateFoodGroupDTO } from './dto/create-food-group.dto';
import { FoodsService } from '../foods/foods.service';
import { UpdateFoodGroupDTO } from './dto/update-food-group.dto';
import { StatusEnum } from 'src/common/enums/status.enum';

@Injectable()
export class FoodGroupService extends BaseService<FoodGroupEntity> {
  constructor(
    @InjectRepository(FoodGroupEntity)
    private readonly foodGroupRepository: Repository<FoodGroupEntity>,
    private readonly foodsService: FoodsService,
  ) {
    super(foodGroupRepository);
  }

  async getAllFoodGroup(): Promise<FoodGroupEntity[]> {
    return await this.query({ relations: { foods: { foodCategory: true } } });
  }

  async getFoodGroupActive(): Promise<FoodGroupEntity[]> {
    return await this.query({
      where: { status: StatusEnum.ACTIVE },
      relations: { foods: { foodCategory: true } },
    });
  }

  async createFoodGroup(data: CreateFoodGroupDTO): Promise<FoodGroupEntity> {
    const { foodIds, name, description, totalFood } = data;
    const foods = await this.foodsService.query({
      where: foodIds.map((id) => ({ id })),
    });

    if (!foods || foods.length === 0) {
      throw new HttpException('Not found food in system', HttpStatus.NOT_FOUND);
    }
    if (foods.length > totalFood) {
      throw new HttpException(
        'Foods must be less than or equal to TotalFood',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newFoodGroup = await this.foodGroupRepository.save({
      name: name,
      description: description,
      totalFood: totalFood,
      foods,
    });

    if (!newFoodGroup)
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR);

    return await this.findOne({
      where: { id: newFoodGroup.id },
      relations: { foods: { foodCategory: true } },
    });
  }

  async updateFoodGroup(id: string, data: UpdateFoodGroupDTO): Promise<string> {
    const foodGroup = await this.foodGroupRepository.findOne({
      where: { id: id },
    });
    if (!foodGroup) {
      throw new HttpException(
        `${id} food group not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      try {
        const { foodIds, name, description, totalFood } = data;
        const foods = await this.foodsService.query({
          where: foodIds.map((id) => ({ id })),
        });
        if (!foods || foods.length === 0) {
          throw new HttpException(
            'Not found food in system',
            HttpStatus.NOT_FOUND,
          );
        }
        if (foods.length > totalFood) {
          throw new HttpException(
            'Foods must be less than or equal to TotalFood',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.save({
          id: id,
          name: name,
          description: description,
          totalFood: totalFood,
          foods,
        });
        return 'Update food group successfull';
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateFoodGroupStatus(id: string): Promise<string> {
    const foodGr = await this.foodGroupRepository.findOne({
      where: { id: id },
    });
    if (!foodGr) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      await this.foodGroupRepository.update(
        { id: id },
        {
          status: StatusEnum.ACTIVE,
        },
      );
      return 'Food group active';
    }
  }

  async removeFoodGroup(id: string): Promise<string> {
    const foodGr = await this.foodGroupRepository.findOne({
      where: { id: id },
    });
    if (!foodGr) {
      throw new HttpException(`${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      await this.foodGroupRepository.update(
        { id: id },
        { status: StatusEnum.IN_ACTIVE },
      );
      return 'Food group inactive';
    }
  }
}
