import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StatusEnum } from 'src/common/enums/status.enum';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { AccountsService } from 'src/models/accounts/accounts.service';
import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { Payload } from './payload';

@Injectable()
export class JwtStratery extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly accountsServive: AccountsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.accessTokenSecret,
    });
  }

  async validate(payload: Payload): Promise<AccountEntity> {
    const { phone } = payload;

    const user = await this.accountsServive.findOne({
      relations: {
        role: true,
        customer: true,
        kitchen: true,
        profile: true,
      },
      where: { phone, status: StatusEnum.ACTIVE },
    });

    if (user.refreshToken === null) return null;
    return user;
  }
}
