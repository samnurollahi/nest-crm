import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (config: ConfigService) => ({
    type: 'postgres',

    host: config.get('database.host'),
    port: parseInt(config.get('database.port') || '5432', 10),

    username: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name'),

    autoLoadEntities: true,
    retryAttempts: 5,
    synchronize: process.env.NODE_ENV == 'DEVELOPMENT' ? true : false,
  }),

  inject: [ConfigService],
};
