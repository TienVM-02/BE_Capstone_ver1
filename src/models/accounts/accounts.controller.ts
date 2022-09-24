import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { AccountsService } from './accounts.service';
import { AccountEntity } from './entities/account.entity';

@Controller('accounts')
@ApiBearerAuth()
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @Public()
  async getAll(): Promise<AccountEntity[]> {
    const accounts = await this.accountsService.query({
      relations: {
        profile: true,
        customer: true,
      },
    });
    if (!accounts || accounts.length === 0)
      throw new HttpException("Don't have resource", HttpStatus.NOT_FOUND);
    return accounts;
  }
}
