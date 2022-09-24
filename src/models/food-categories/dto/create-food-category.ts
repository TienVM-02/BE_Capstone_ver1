import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFoodCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
