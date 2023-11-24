import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { ValidationException } from './exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors.map((error) =>
          Object.values(error.constraints),
        );
        return new ValidationException(errors.join(', '));
      },
    }),
  );
  app.enableVersioning({ type: VersioningType.URI });
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
