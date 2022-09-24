import { AccountEntity } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountProfile } from './profile/account.profile';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountProfile],
  exports: [AccountsService],
})
export class AccountsModule {}
