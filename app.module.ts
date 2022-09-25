// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Module } from '@nestjs/common';
// import { RolesGuard } from './guards/role.guard';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
// import { TestController } from 'src/app.controller';
import { AppConfigModule } from 'src/config/app/config.module';
import { AllExceptionsFilter } from 'src/exceptions/catch-all-exception.filter';
import { AccountsModule } from 'src/models/accounts/accounts.module';
// import { AutomapperProviderModule } from './providers/automapper/provider.module';
import { MySQLDatabaseProviderModule } from 'src/providers/database/mysql/provider.module';
// import { FireBaseConfigModule } from './config/firebase/config.module';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { JwtProviderModule } from 'src/providers/jwt/provider.module';
import { AutomapperProviderModule } from 'src/providers/automapper/provider.module';
import { FireBaseConfigModule } from 'src/config/firebase/config.module';
import { SharedModule } from 'src/shared/shared.module';
import { KitchenModule } from 'src/models/kitchens/kitchens.module';
import { FoodCategoriesModule } from 'src/models/food-categories/food-categories.module';
import { FoodsModule } from 'src/models/foods/foods.module';
import { StationsModule } from 'src/models/stations/stations.module';
import { PackagesModule } from 'src/models/packages/packages.module';
import { ShippersModule } from 'src/models/shippers/shippers.module';
import { TimeSlotsModule } from 'src/models/timeSlots/timeSlots.module';
import { PackageItemModule } from 'src/models/package-item/package-item.module';
import { RolesGuard } from 'src/guards/role.guard';
// import { FoodCategoriesModule } from './models/food-categories/food-categories.module';
// import { FoodsModule } from './models/foods/foods.module';
// import { FoodGroupModule } from './models/food-group/food-group.module';
// import { StationsModule } from './models/stations/stations.module';
// import { AuthModule } from './auth/auth.module';
// import { JwtProviderModule } from './providers/jwt/provider.module';

// import { ShippersModule } from './models/shippers/shippers.module';
// import { TimeSlotsModule } from './models/timeSlots/timeSlots.module';
// import { PackagesModule } from './models/packages/packages.module';
// import { KitchenModule } from './models/kitchens/kitchens.module';
// import { DeliveryTripModule } from './models/deliveryTrips/deliveryTrip.module';
// import { PackageItemModule } from './models/package-item/package-item.module';
// import { ProfileModule } from './models/profiles/profile.module';
// import { SharedModule } from './shared/shared.module';

// import { FirebaseProviderModule } from 'providers/firebase/provider.module';

@Module({
  imports: [
    AppConfigModule,
    MySQLDatabaseProviderModule,
    JwtProviderModule,
    AutomapperProviderModule,
    FireBaseConfigModule,
    // AccountsModule,
    // ProfileModule,
    SharedModule,
    // AuthModule,
    KitchenModule,

    FoodCategoriesModule,
    FoodsModule,
    // FoodGroupModule,
    StationsModule,
    PackagesModule, //-> update
    // ====================================
    // DeliveryTripModule,
    ShippersModule, //-> update
    TimeSlotsModule, //-> update

    KitchenModule, //-> update
    PackageItemModule,

    // ImagesModule,
    // FirebaseProviderModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

//Den bao gio moi co the quen nhung cau chuyen ma ta da qua.
//Xin loi vi nhung loi hua, xin loi vi em da sai.
