import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  providers: [AppService],
})
export class AppModule {}
