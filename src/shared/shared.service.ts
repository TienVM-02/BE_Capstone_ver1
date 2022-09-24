import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  public generateOtp(): number {
    let code = 0;
    do {
      code = Math.floor(Math.random() * 10000);
    } while (code < 1000);
    return code;
  }
  public verifyOTPSignUp(
    otp: number,
    codeVerify: number,
    dateExpiredVerifyCode: Date,
  ): void {
    const diff = Math.abs(Date.now() - dateExpiredVerifyCode.getTime());
    const minutes = Math.floor(diff / 1000 / 60);
    if (otp === codeVerify && minutes > 5) {
      throw new BadRequestException('OTP time up.!');
    }
    if (otp !== codeVerify && minutes < 5) {
      throw new BadRequestException('OTP is wrong.!');
    }
    if (otp !== codeVerify && minutes > 5) {
      throw new BadRequestException('OTP is wrong and time up.!');
    }
  }
}
