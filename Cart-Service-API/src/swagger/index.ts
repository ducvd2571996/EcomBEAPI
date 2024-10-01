import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import version from 'project-version';

import { SWAGGER_API_DESCRIPTION, SWAGGER_API_ENDPOINT, SWAGGER_API_NAME } from './swagger.constant';
import { swaggerOptions } from './swagger.options';

export const setupSwagger = (app: INestApplication) => {
  const swaggerConfigs = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfigs, swaggerOptions);
  SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document);
};
