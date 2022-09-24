import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { AccountsModule } from 'src/models/accounts/accounts.module';
import { CustomersModule } from 'src/models/customers/customers.module';
import { ProfileModule } from 'src/models/profiles/profile.module';
import { RolesModule } from 'src/models/roles/roles.module';
import { JwtProviderModule } from 'src/providers/jwt/provider.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthenticationController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratery } from './jwt.stratery';

@Module({
  imports: [
    CustomersModule,
    AccountsModule,
    RolesModule,
    JwtConfigModule,
    JwtProviderModule,
    ProfileModule,
    SharedModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthService, JwtStratery],
  exports: [AuthService],
})
export class AuthModule {}
