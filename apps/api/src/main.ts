import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    // Security Middleware
    app.use(helmet());
    app.use(cookieParser());

    // CORS setup
    app.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    });

    // Global Prefix & Validation
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    );

    // Global Interceptors & Filters
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    // Swagger Documentation Setup
    const config = new DocumentBuilder()
      .setTitle('AXA Industries API')
      .setDescription('Business E-Commerce & Order Management REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    if (process.env.VERCEL) {
      await app.init();
      cachedServer = app.getHttpAdapter().getInstance();
    } else {
      const port = process.env.PORT || 4000;
      await app.listen(port);
      logger.log(`🚀 API Server running on: http://localhost:${port}/api`);
      logger.log(`📚 Swagger Documentation: http://localhost:${port}/api/docs`);
    }
  }
  return cachedServer;
}

if (!process.env.VERCEL) {
  bootstrapServer();
}

export default async function handler(req: any, res: any) {
  const server = await bootstrapServer();
  return server(req, res);
}
