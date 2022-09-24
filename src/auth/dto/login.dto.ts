import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  // @ApiProperty()
  // username: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;
}
