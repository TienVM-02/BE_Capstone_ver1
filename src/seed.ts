import { SeederModule } from './database/seeds/seeder.module';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './database/seeds/seeder';
async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  const seeder = appContext.get(Seeder);
  try {
    // await seeder.insertLocationCategories();
    await seeder.insertRoles();
    // await seeder.insertVehicleTypes();
    // await seeder.insertLocations(12);
    // await seeder.insertLocationCategory('hotel');
    // await seeder.insertLocationCategory('shopping');
    // await seeder.insertLocationCategory('restaurant');
    // await seeder.insertLocationCategory('visit');
    // await seeder.insertAccount();
  } catch (error) {
    console.error(error);
  } finally {
    appContext.close();
  }
}

bootstrap();
