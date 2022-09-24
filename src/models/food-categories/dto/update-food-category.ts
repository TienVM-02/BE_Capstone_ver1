import { PartialType } from '@nestjs/swagger';
import { CreateFoodCategoryDTO } from './create-food-category';

export class UpdateFoodCategoryDTO extends PartialType(CreateFoodCategoryDTO) {}
