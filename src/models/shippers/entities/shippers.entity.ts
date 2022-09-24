import { AutoMap } from '@automapper/classes';
import { StatusEnum } from 'src/common/enums/status.enum';
import { BaseEntity } from 'src/models/base/base.entity';
import { DeliveryTripEntity } from 'src/models/deliveryTrips/entities/deliveryTrip.entity';
import { KitchenEntity } from 'src/models/kitchens/entities/kitchens.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'shippers' })
export class ShipperEntity extends BaseEntity {
  @Column()
  @AutoMap()
  noPlate: string;

  @Column()
  @AutoMap()
  vehicleType: string;

  @Column({ default: StatusEnum.ACTIVE })
  @AutoMap()
  status: string;

  // @AutoMap(() => KitchenEntity)
  // @ManyToOne(() => KitchenEntity, (kitchen) => kitchen.shippers)
  // kitchen: KitchenEntity;

  // @OneToMany(() => DeliveryTripEntity, (trip) => trip.shipper)
  // trips: DeliveryTripEntity[];
}
