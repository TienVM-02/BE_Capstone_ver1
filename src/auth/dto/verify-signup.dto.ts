import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class VerifySignUp {
  @ApiProperty()
  phone: string;
  // username: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  otp: number;
}
