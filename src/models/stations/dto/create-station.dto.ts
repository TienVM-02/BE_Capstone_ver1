import { ApiProperty } from '@nestjs/swagger';

export class CreateStationDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: number;

  @ApiProperty()
  openTime: string;

  @ApiProperty()
  closeTime: string;
}
