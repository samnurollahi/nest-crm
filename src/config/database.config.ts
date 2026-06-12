import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],

  useFactory: (config: ConfigService) => {
    return {
      type: 'postgres',

      host: config.get<string>('database.host'),
      port: Number(config.get<number>('database.port')),

      username: config.get<string>('database.username'),
      password: config.get<string>('database.password'),
      database: config.get<string>('database.name'),

      autoLoadEntities: true,

      retryAttempts: 5,

      synchronize: config.get<string>('nodeEnv') === 'development',
    };
  },
};
