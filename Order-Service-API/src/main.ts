import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import RequestIP from 'request-ip';
import compression from 'compression';
import Helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import { SWAGGER_API_ENDPOINT } from './swagger/swagger.constant';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });
  setupSwagger(app);
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 15, // limit each IP to 15 requests per windowMs
  });

  const configService = app.get(ConfigService);
  app.use(Helmet());
  app.use(limiter);
  app.use(RequestIP.mw());
  app.use(compression());
  app.use(bodyParser.json({ limit: '1000kb' }));
  app.use(bodyParser.urlencoded({ limit: '1000kb', extended: true }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  await app.listen(configService.get<number>('PORT'));
  // eslint-disable-next-line no-console
  console.log(`http://127.0.0.1:${configService.get<number>('PORT')}${SWAGGER_API_ENDPOINT}`);
  app.enableShutdownHooks();
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});
