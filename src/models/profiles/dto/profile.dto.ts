import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/models/base/base.dto';
export class ProfileDTO extends BaseDTO {
  @AutoMap()
  @ApiProperty()
  fullName: string;

  @AutoMap()
  @ApiProperty()
  DOB: Date;

  // @AutoMap()
  // @ApiProperty()
  // address: string;

  @AutoMap()
  @ApiProperty()
  avatar: string;

  // @AutoMap()
  // @ApiProperty()
  // phone: string;

  @AutoMap()
  @ApiProperty()
  email: string;
}
