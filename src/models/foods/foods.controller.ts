import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { CreateFoodDTO } from './dto/create-food.dto';
import { FoodDTO } from './dto/food.dto';
import { UpdateFoodDTO } from './dto/update-food.dto';
import { FoodEntity } from './entities/foods.entity';
import { FoodsService } from './foods.service';

@ApiBearerAuth()
@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'GET ALL FOOD',
    type: [FoodDTO],
  })
  @UseInterceptors(MapInterceptor(FoodEntity, FoodDTO, { isArray: true }))
  async findAll(): Promise<FoodEntity[]> {
    const listFood = await this.foodsService.getAllFood();
    if (!listFood || listFood.length == 0) {
      throw new HttpException(
        "Dont't have resource food",
        HttpStatus.NOT_FOUND,
      );
    }
    return listFood;
  }

  @Public()
  @Get('/active')
  @ApiResponse({
    status: 200,
    description: 'GET ALL ACTIVE FOOD',
    type: [FoodDTO],
  })
  @UseInterceptors(MapInterceptor(FoodEntity, FoodDTO, { isArray: true }))
  async findAllActiveFood(): Promise<FoodEntity[]> {
    const listFood = await this.foodsService.getAllActiveFood();
    if (!listFood || listFood.length == 0) {
      throw new HttpException(
        "Dont't have resource active food",
        HttpStatus.NOT_FOUND,
      );
    }
    return listFood;
  }

  @Public()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'GET FOOD BY ID',
    type: FoodDTO,
  })
  @UseInterceptors(MapInterceptor(FoodEntity, FoodDTO))
  async findFoodById(@Param('id') id: string): Promise<FoodEntity> {
    const food = await this.foodsService.findOne({
      where: { id: id },
      relations: { foodCategory: true },
    });
    if (!food) {
      throw new HttpException(
        "Dont't have resource food",
        HttpStatus.NOT_FOUND,
      );
    }
    return food;
  }

  @Public()
  @Get('category/:id')
  @ApiResponse({
    status: 200,
    description: 'GET FOOD BY CATEGORY',
    type: [FoodDTO],
  })
  @UseInterceptors(MapInterceptor(FoodEntity, FoodDTO, { isArray: true }))
  async findFoodByCategory(@Param('id') idCate: string): Promise<FoodEntity[]> {
    return await this.foodsService.getFoodByCategory(idCate);
  }

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Create new food successfully',
    type: FoodDTO,
  })
  @UseInterceptors(MapInterceptor(FoodEntity, FoodDTO))
  async createFood(
    @Body() createFoodDTO: CreateFoodDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<FoodEntity> {
    return await this.foodsService.createFood(createFoodDTO, image);
  }

  // Update
  @Put('/update-food/:id')
  @Public()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Update category successfully',
    type: String,
  })
  async updateFood(
    @Param('id') id: string,
    @Body() updateFood: UpdateFoodDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<string> {
    return await this.foodsService.updateFood(id, updateFood, image);
  }

  // Remove Food = Update status
  @Public()
  @Put('/update-status/:id')
  @ApiResponse({
    status: 200,
    description: 'Update Food Status',
    type: String,
  })
  async updateStatusFood(@Param('id') id: string): Promise<string> {
    return await this.foodsService.updateStatusFood(id);
  }
}
