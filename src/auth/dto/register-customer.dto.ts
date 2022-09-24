import { ApiProperty } from '@nestjs/swagger';

export class RegisterCustomerDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  fullName: string;
  @ApiProperty({
    type: Date,
    description: 'dateOfBirth',
    default: new Date().toISOString().slice(0, 10),
  })
  public DOB: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  avatar: string;
}
