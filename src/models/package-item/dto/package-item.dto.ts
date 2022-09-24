import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/models/base/base.dto';

export class PackageItemDTO extends BaseDTO {
  @ApiProperty()
  @AutoMap()
  startDate: string;

  @ApiProperty()
  @AutoMap()
  endDate: string;

  @ApiProperty()
  @AutoMap()
  maxFood: number;

  @ApiProperty()
  @AutoMap()
  maxAmount: number;
}
