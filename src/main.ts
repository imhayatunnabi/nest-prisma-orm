import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nest Js Prisma API Documentation')
    .setDescription('Nest Js Prima API Documentation With Swagger')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      },
    )
    .build();

  // Validation pipes
  app.useGlobalPipes(new ValidationPipe());
  // Use the ClassSerializerInterceptor to remove a field from the response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // Set global prefix Option
  app.setGlobalPrefix('api');

  // app.use

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
