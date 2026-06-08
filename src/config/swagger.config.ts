import { INestApplication, Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

export class SwaggerConfig {
  private static instance: SwaggerConfig;
  private app: INestApplication;

  private constructor(app: INestApplication) {
    this.app = app;
  }

  public static getInstance(app: INestApplication): SwaggerConfig {
    if (!SwaggerConfig.instance) {
      SwaggerConfig.instance = new SwaggerConfig(app);
    }
    return SwaggerConfig.instance;
  }

  private getDocumentBuilder(): DocumentBuilder {
    return (
      new DocumentBuilder()

        .setTitle('My Awesome API')
        .setDescription(
          `
        ## 🚀 API Documentation
        This is a **RESTful API** built with NestJS and TypeORM.
        
        ### Features:
        
        ### Base URL:
        \`http://localhost:3000\`
      `,
        )
        .setVersion('1.0.0')

        // .setLicense('MIT', 'https://opensource.org/licenses/MIT')

        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter your JWT token',
            in: 'header',
          },
          'JWT-auth',
        )

        .addApiKey(
          {
            type: 'apiKey',
            name: 'X-API-Key',
            in: 'header',
            description: 'API Key for external services',
          },
          'api-key',
        )

        // .addTag('Users', 'User management endpoints', {
        //   description: 'Find more information about user operations',
        //   url: 'https://example.com/docs/users',
        // })
        // .addTag('Posts', 'Blog posts management')
        // .addTag('Auth', 'Authentication endpoints')
        // .addTag('Admin', 'Admin only operations (requires admin role)')

        .setBasePath('/api/v1')
    );
  }

  private getOptions(): SwaggerDocumentOptions {
    return {
      operationIdFactory: (controllerKey: string, methodKey: string) => {
        const controller = controllerKey
          .replace('Controller', '')
          .toLowerCase();
        return `${controller}-${methodKey}`;
      },
      ignoreGlobalPrefix: false,
      deepScanRoutes: true,
    };
  }

  public setup() {
    const config = this.getDocumentBuilder().build();
    const options = this.getOptions();

    const document = SwaggerModule.createDocument(this.app, config, options);

    SwaggerModule.setup('api/docs', this.app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        docExpansion: 'none',
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
        tryItOutEnabled: true,
        syntaxHighlight: {
          theme: 'monokai',
        },
        tagsSorter: 'alpha',
        operationsSorter: 'method',
      },

      customCss: `
        .swagger-ui .topbar { background-color: #2c3e50; }
        .swagger-ui .topbar .download-url-wrapper .download-url-button { background-color: #3498db; }
        .swagger-ui .scheme-container { background-color: #ecf0f1; }
      `,
      customJs: '/custom-script.js',
      customCssUrl: '/custom-theme.css',
      customfavIcon: '/favicon.ico',

      useGlobalPrefix: true,
      jsonDocumentUrl: '/swagger/json',
      yamlDocumentUrl: '/swagger/yaml',

      validatorUrl: undefined,
      explorer: true,
    });

    new Logger().log(
      'Swagger documentation available at: /api/docs',
      'documentation',
    );
  }
}
