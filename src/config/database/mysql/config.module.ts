import { MySQLConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        SQL_HOST: Joi.string().required(),
        SQL_PORT: Joi.number().required(),
        SQL_USERNAME: Joi.string().required(),
        SQL_PASSWORD: Joi.string().required(),
        SQL_DATABASE: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, MySQLConfigService],
  exports: [ConfigService, MySQLConfigService],
})
export class MySQLConfigModule {}
