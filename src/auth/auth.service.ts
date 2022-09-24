import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as adminFirebase from 'firebase-admin';
import { RoleEnum } from 'src/common/enums/role.enum';
import { StatusEnum } from 'src/common/enums/status.enum';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { AccountsService } from 'src/models/accounts/accounts.service';
import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { CustomersService } from 'src/models/customers/customers.service';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { ProfileEntity } from 'src/models/profiles/entities/profile.entity';
import { ProfileService } from 'src/models/profiles/profile.service';
import { RoleEntity } from 'src/models/roles/entities/role.entity';
import { RolesService } from 'src/models/roles/roles.service';
import { SharedService } from 'src/shared/shared.service';
import { DataSource, EntityManager } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { VerifySignUp } from './dto/verify-signup.dto';
import { Payload } from './payload';
import { LoginResponseDto } from './response/login-response.dto';
import { RefreshTokenResponseDTO } from './response/refresh-token-response.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly accountsService: AccountsService,
    private readonly rolesService: RolesService,
    private readonly customerService: CustomersService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly sharedService: SharedService, // private readonly mailService: MailService,
  ) {}

  async signUpCustomer(register: RegisterCustomerDto): Promise<AccountEntity> {
    const account = await this.accountsService.findOne({
      where: { phone: register.phone },
    });
    if (Boolean(account)) {
      throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
    }
    register.password = await bcrypt.hash(register.password, 10);
    const callback = async (entityManager: EntityManager): Promise<void> => {
      const role = await entityManager.findOne(RoleEntity, {
        where: { name: RoleEnum.CUSTOMER },
      });

      const accountEntity = await entityManager.save(
        AccountEntity,
        entityManager.create(AccountEntity, {
          phone: register.phone,
          password: register.password,
          role,
        }),
      );

      await entityManager.save(
        CustomerEntity,
        entityManager.create(CustomerEntity, {
          id: accountEntity.id,
          address: register.address,
        }),
      );

      await entityManager.save(
        ProfileEntity,
        entityManager.create(ProfileEntity, {
          account: accountEntity,
          ...register,
        }),
      );
    };

    await this.accountsService.transaction(callback, this.dataSource);

    return this.accountsService.findOne({
      relations: { role: true, customer: true },
      where: { phone: register.phone },
    });
  }

  // async verifySignUp(dto: VerifySignUp): Promise<string> {
  //   const { phone, otp } = dto;
  //   const user = await this.accountsService.findOne({
  //     where: { phone: phone },
  //   });
  //   if (!user) {
  //     throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
  //   }
  //   this.sharedService.verifyOTPSignUp(
  //     +otp,
  //     user.codeVerify,
  //     user.dateExpiredVerifyCode,
  //   );
  //   await this.accountsService.updateConfirmVerifyStatusAccount(user.id);
  //   return 'Verify OTP Successfully';
  // }

  async login(dto: LoginDto, role: RoleEnum): Promise<LoginResponseDto> {
    const { phone, password } = dto;
    const user = await this.accountsService.findOne({
      relations: { role: true },
      where: { phone, role: { name: role }, status: StatusEnum.ACTIVE },
    });

    if (!user)
      throw new HttpException('Account invalid', HttpStatus.BAD_REQUEST);
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      throw new HttpException('Account invalid', HttpStatus.BAD_REQUEST);
    const payload: Payload = { phone, role };
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.jwtConfigService.refreshTokenSecret,
        expiresIn: this.jwtConfigService.refreshTokenExpiresIn,
      },
    );
    await this.accountsService.updateRefreshToken(refreshToken, user.id);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtConfigService.accessTokenSecret,
        expiresIn: this.jwtConfigService.accessTokenExpiresIn,
      }),
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDTO> {
    const { id } = (await this.jwtService.verify(refreshToken, {
      secret: this.jwtConfigService.refreshTokenSecret,
      ignoreExpiration: false,
    })) as { id: string };
    const user = await this.accountsService.findOne({
      where: { id: id },
      relations: {
        role: true,
      },
    });
    if (!user || user.refreshToken != refreshToken) {
      throw new HttpException('Token invalid', HttpStatus.BAD_REQUEST);
    }
    const payload: Payload = { phone: user.phone, role: user.role.name };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.jwtConfigService.accessTokenSecret,
        expiresIn: this.jwtConfigService.accessTokenExpiresIn,
      }),
    };
  }

  async logout(user: AccountEntity): Promise<string> {
    const result = await this.accountsService.updateRefreshToken(null, user.id);
    return result.affected == 1 ? 'logout success' : 'logout failure';
  }
}
