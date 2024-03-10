import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import * as bodyParser from 'body-parser';
import { MongoIoAdapter } from './modules/events/mongo.adapter';

async function bootstrap() {
  // const fs = require('fs');
  // const httpsOptions = {
  //   key: fs.readFileSync('./key.pem'),
  //   cert: fs.readFileSync('./cert.pem'),
  // };

  // const app = await NestFactory.create(AppModule, {
  //   cors: true,
  //   httpsOptions,
  // });
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      env.FRONTEND_URL as string,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const mongoIoAdapter = new MongoIoAdapter(app);
  await mongoIoAdapter.connectToMongo();
  await app.listen(4000);
}
bootstrap();
