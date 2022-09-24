import { PartialType } from '@nestjs/swagger';
import { CreateFoodDTO } from './create-food.dto';

export class UpdateFoodDTO extends PartialType(CreateFoodDTO) {}
