// import { AccountsSeederModule } from './accounts/accounts.module';
// import { LocationCategoriesSeederModule } from './location-categories/location-categories.module';
import { Module } from '@nestjs/common';
import { MySQLDatabaseProviderModule } from 'src/providers/database/mysql/provider.module';
import { Seeder } from './seeder';
// import { VehicleTypesSeederModule } from './vehicle-types/vehicle-types.module';
import { RolesSeederModule } from './roles/roles.module';
// import { LocationsSeederModule } from './locations/locations.module';

@Module({
  imports: [
    MySQLDatabaseProviderModule,
    // VehicleTypesSeederModule,
    // LocationCategoriesSeederModule,
    RolesSeederModule,
    // LocationsSeederModule,
    // AccountsSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
