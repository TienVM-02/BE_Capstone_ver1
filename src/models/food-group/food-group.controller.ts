import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { CreateFoodGroupDTO } from './dto/create-food-group.dto';
import { FoodGroupDTO } from './dto/food-group.dto';
import { UpdateFoodGroupDTO } from './dto/update-food-group.dto';
import { FoodGroupEntity } from './entities/food-group.entity';
import { FoodGroupService } from './food-group.service';

@ApiBearerAuth()
@ApiTags('food-group')
@Controller('food-group')
export class FoodGroupController {
  constructor(private readonly foodGroupService: FoodGroupService) {}

  //List all foodGroup
  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'LIST ALL FOOD GROUP',
    type: [FoodGroupDTO],
  })
  @UseInterceptors(
    MapInterceptor(FoodGroupEntity, FoodGroupDTO, { isArray: true }),
  )
  async listAllFoodGroup(): Promise<FoodGroupEntity[]> {
    const listFoodGroup = await this.foodGroupService.getAllFoodGroup();
    if (!listFoodGroup || listFoodGroup.length == 0) {
      throw new HttpException('No data food group', HttpStatus.NOT_FOUND);
    } else {
      return listFoodGroup;
    }
  }

  //List all foodgroup active
  @Public()
  @Get('/active')
  @ApiResponse({
    status: 200,
    description: 'LIST ALL FOOD GROUP ACTIVE',
    type: [FoodGroupDTO],
  })
  @UseInterceptors(
    MapInterceptor(FoodGroupEntity, FoodGroupDTO, { isArray: true }),
  )
  async listFoodGroupActive(): Promise<FoodGroupEntity[]> {
    const listFoodGroupActive =
      await this.foodGroupService.getFoodGroupActive();
    if (!listFoodGroupActive || listFoodGroupActive.length == 0) {
      throw new HttpException('No food group active', HttpStatus.NOT_FOUND);
    } else {
      return listFoodGroupActive;
    }
  }

  @Public()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'GET FOODGROUP BY ID',
    type: FoodGroupDTO,
  })
  @UseInterceptors(MapInterceptor(FoodGroupEntity, FoodGroupDTO))
  async findFoodById(@Param('id') id: string): Promise<FoodGroupEntity> {
    const foodGroup = await this.foodGroupService.findOne({
      where: { id: id },
      relations: { foods: { foodCategory: true } },
    });
    if (!foodGroup) {
      throw new HttpException(
        "Dont't have resource foodGroup",
        HttpStatus.NOT_FOUND,
      );
    }
    return foodGroup;
  }

  //Create foodGroup
  @Public()
  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'Create food group',
    type: FoodGroupDTO,
  })
  @UseInterceptors(MapInterceptor(FoodGroupEntity, FoodGroupDTO))
  async createFoodGroup(
    @Body() createDTO: CreateFoodGroupDTO,
  ): Promise<FoodGroupEntity> {
    return await this.foodGroupService.createFoodGroup(createDTO);
  }

  //Update food group
  @Public()
  @Put('/update/:id')
  @ApiResponse({
    status: 200,
    description: 'UPDATE FOOD GROUP',
    type: String,
  })
  async updateFoodGroup(
    @Param('id') id: string,
    @Body() updateDTO: UpdateFoodGroupDTO,
  ): Promise<string> {
    return await this.foodGroupService.updateFoodGroup(id, updateDTO);
  }

  //Update food group status
  @Public()
  @Put('/active-food-group/:id')
  @ApiResponse({
    status: 200,
    description: 'UPDATE FOOD GROUP STATUS',
    type: String,
  })
  async updateFoodGroupStatus(@Param('id') id: string): Promise<string> {
    return await this.foodGroupService.updateFoodGroupStatus(id);
  }

  //Remove food group
  @Public()
  @Put('/remove-food-group/:id')
  @ApiResponse({
    status: 200,
    description: 'REMOVE FOOD GROUP',
    type: String,
  })
  async removeFoodGroup(@Param('id') id: string): Promise<string> {
    return await this.foodGroupService.removeFoodGroup(id);
  }
}
