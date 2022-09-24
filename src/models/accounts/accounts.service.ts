import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/common/enums/status.enum';
import { Repository, UpdateResult } from 'typeorm';
import { BaseService } from '../base/base.service';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountsService extends BaseService<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepository: Repository<AccountEntity>,
  ) {
    super(accountsRepository);
  }

  async findByEmail(email: string): Promise<AccountEntity> {
    return await this.findOne({
      relations: {
        profile: true,
        role: true,
      },
      where: {
        profile: {
          email: email,
        },
      },
    });
  }

  async updateRefreshToken(
    refreshToken: string,
    id: string,
  ): Promise<UpdateResult> {
    return await this.accountsRepository.update(
      { id: id },
      { refreshToken: refreshToken },
    );
  }

  async updateConfirmVerifyStatusAccount(id: string): Promise<UpdateResult> {
    return await this.accountsRepository.update(
      { id: id },
      {
        confirmedVerify: true,
        status: StatusEnum.ACTIVE,
      },
    );
  }
}
