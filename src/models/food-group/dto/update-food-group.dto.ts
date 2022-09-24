import { PartialType } from '@nestjs/swagger';
import { CreateFoodGroupDTO } from './create-food-group.dto';

export class UpdateFoodGroupDTO extends PartialType(CreateFoodGroupDTO) {}
