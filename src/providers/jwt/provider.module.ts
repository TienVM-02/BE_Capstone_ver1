import { JwtConfigService } from './../../config/jwt/config.service';
import { JwtConfigModule } from './../../config/jwt/config.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.accessTokenSecret,
        signOptions: { expiresIn: jwtConfigService.accessTokenExpiresIn },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtProviderModule {}
