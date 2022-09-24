import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Public } from 'src/decorators/public.decorator';
import { GetUser } from 'src/decorators/user.decorator';
import { AccountEntity } from 'src/models/accounts/entities/account.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { VerifySignUp } from './dto/verify-signup.dto';
import { LoginResponseDto } from './response/login-response.dto';
import { RefreshTokenResponseDTO } from './response/refresh-token-response.dto';

@ApiBearerAuth()
@Controller('auths')
@ApiTags('auths')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up/customer')
  @Public()
  async signUpCustomer(
    @Body() dto: RegisterCustomerDto,
  ): Promise<AccountEntity> {
    return await this.authService.signUpCustomer(dto);
  }

  // @Post('/verify/sign-up/customer')
  // @Public()
  // async verifySignUpTourist(@Body() dto: VerifySignUp): Promise<string> {
  //   return await this.authService.verifySignUp(dto);
  // }

  @Post('logn-in/customer')
  @Public()
  async loginCustomer(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto, RoleEnum.CUSTOMER);
  }

  @Post('login-in/kitchen')
  @Public()
  async loginKitchen(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto, RoleEnum.KITCHEN);
  }

  @Post('login-in/shipper')
  @Public()
  async loginShipper(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto, RoleEnum.SHIPPER);
  }

  @Post('login-in/admin')
  @Public()
  async loginAdmin(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto, RoleEnum.ADMIN);
  }

  @Post('refreshToken')
  @Public()
  async refreshToken(
    @Body() dto: RefreshTokenDTO,
  ): Promise<RefreshTokenResponseDTO> {
    return await this.authService.refreshToken(dto.refresh_token);
  }

  @Post('logout')
  async logout(@GetUser() user: AccountEntity): Promise<string> {
    return await this.authService.logout(user);
  }
}
