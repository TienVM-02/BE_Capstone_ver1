import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get accessTokenSecret(): string {
    return this.configService.get<string>('jwt.accessTokenSecret');
  }

  get accessTokenExpiresIn(): string {
    return this.configService.get<string>('jwt.accessTokenExpiresIn');
  }

  get refreshTokenSecret(): string {
    return this.configService.get<string>('jwt.jwtRefreshTokenSecret');
  }

  get refreshTokenExpiresIn(): string {
    return this.configService.get<string>('jwt.jwtRefreshTokenExpiresIn');
  }
}
