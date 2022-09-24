import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MySQLConfigModule } from 'src/config/database/mysql/config.module';
import { MySQLConfigService } from 'src/config/database/mysql/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MySQLConfigModule],
      inject: [MySQLConfigService],
      useFactory: (mysqlConfigService: MySQLConfigService) => ({
        type: 'mysql',
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        entities: [__dirname + '/../../../models/**/*.entity.{ts,js}'],
        synchronize: true,
        logging: false,
        legacySpatialSupport: false,
      }),
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MySQLDatabaseProviderModule {}
