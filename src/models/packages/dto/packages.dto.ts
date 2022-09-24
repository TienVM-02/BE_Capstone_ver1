import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
// import { IsInt, IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../base/base.dto';

export class PackageDTO extends BaseDTO {
  @ApiProperty()
  @AutoMap()
  startSale: string;

  @ApiProperty()
  @AutoMap()
  endSale: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  // @IsInt()
  price: number;

  @ApiProperty()
  @AutoMap()
  // @IsInt()
  totalDate: number;

  @ApiProperty()
  @AutoMap()
  // @IsInt()
  totalMeal: number;

  @ApiProperty()
  @AutoMap()
  // @IsInt()
  totalFood: number;

  @ApiProperty()
  @AutoMap()
  // @IsInt()
  totalStation: number;
}
