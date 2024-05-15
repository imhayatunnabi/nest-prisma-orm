import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nest Js Prisma API Documentation')
    .setDescription('Nest Js Prima API Documentation With Swagger')
    .setVersion('0.0.1')
    .build();
  // validation pipes
  app.useGlobalPipes(new ValidationPipe());
  // Use the ClassSerializerInterceptor to remove a field from the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
