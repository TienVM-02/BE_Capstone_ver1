import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FoodGroupController } from './food-group.controller';
import { FoodGroupService } from './food-group.service';
import { FoodGroupProfile } from './profile/food-group.profile';
import { FoodGroupEntity } from './entities/food-group.entity';
import { FoodsModule } from '../foods/foods.module';

@Module({
  imports: [TypeOrmModule.forFeature([FoodGroupEntity]), FoodsModule],
  controllers: [FoodGroupController],
  providers: [FoodGroupService, FoodGroupProfile],
  exports: [FoodGroupService],
})
export class FoodGroupModule {}
