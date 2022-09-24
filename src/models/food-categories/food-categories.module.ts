import { FoodCategoriesProfile } from './profile/food-categories.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FoodCategoryEntity } from './entities/food-categories.entity';
import { FoodCategoriesController } from './food-categories.controller';
import { FoodCategoriesService } from './food-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodCategoryEntity])],
  controllers: [FoodCategoriesController],
  providers: [FoodCategoriesService, FoodCategoriesProfile],
  exports: [FoodCategoriesService],
})
export class FoodCategoriesModule {}
