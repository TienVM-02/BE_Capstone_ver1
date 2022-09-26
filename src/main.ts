import { AppConfigService } from './config/app/config.service';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { FireBaseConfigService } from './config/firebase/config.service';
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true })); // apply pipe validation
  app.enableCors();

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get(AppConfigService);
  //setup firebase
  const firebaseConfig: FireBaseConfigService = app.get(FireBaseConfigService);

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: firebaseConfig.projectId,
      privateKey: firebaseConfig.privateKey,
      clientEmail: firebaseConfig.clientEmail,
    }),
    storageBucket: firebaseConfig.storageBucket,
  });

  //setup open api
  const configSwagger = new DocumentBuilder()
    .setTitle('Capstone Meal Sub Plan')
    .setDescription('The project API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/v1/', app, document);
  //end setup open api

  await app.listen(appConfig.port, () =>
    console.info(`Server running port ${appConfig.port}`),
  );
}
bootstrap();
