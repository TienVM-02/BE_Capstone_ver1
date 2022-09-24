import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesModule } from '../packages/packages.module';
import { PackageItemEntity } from './entities/package-item.entity';
import { PackageItemController } from './package-item.controller';
import { PackageItemService } from './package-item.service';
import { PackageItemProfile } from './profile/packageItem.profile';

@Module({
  imports: [TypeOrmModule.forFeature([PackageItemEntity]), PackagesModule],
  controllers: [PackageItemController],
  providers: [PackageItemService, PackageItemProfile],
})
export class PackageItemModule {}
