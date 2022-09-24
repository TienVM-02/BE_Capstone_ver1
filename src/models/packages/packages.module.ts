import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PackageService } from './packages.service';
import { PackageController } from './packages.controller';
import { PackageEntity } from './entities/packages.entity';
import { PackageProfile } from './profile/package.profile';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity])],
  controllers: [PackageController],
  providers: [PackageService, PackageProfile],
  exports: [PackageService],
})
export class PackagesModule {}
