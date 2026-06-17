import { CacheModule } from '@nestjs/cache-manager';
import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalExceptionFilter } from './common/filters/globalException.filter';
import configuration from './config/configuration';
import { databaseConfig } from './config/database.config';
import { envValidationSchema } from './config/env-schema';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { LeadsModule } from './modules/leads/leads.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    ThrottlerModule.forRoot([
      {
        limit: 2500,
        ttl: 60_000,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      ttl: 5_000, // mss
      max: 10,
    }),
    CompanyModule,
    UserModule,
    AuthModule,
    LeadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'LOG_PATH',
      useValue: path.join(process.cwd(), '.log'),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@Inject('LOG_PATH') private readonly logPath: string) {}
  onModuleInit() {
    fs.readdir(process.cwd(), (err, files) => {
      if (err) {
        new Logger.error(err, 'app onModuleInit');
        process.exit(-1);
      }

      const has = files.includes('.log');
      if (!has) {
        fs.writeFile(this.logPath, '', (err) => {
          if (err) {
            new Logger.error(err, 'app onModuleInit');
            process.exit(-1);
          }
        });
      }
    });
  }
}
