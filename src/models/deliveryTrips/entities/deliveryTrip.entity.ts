import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/models/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StationEntity } from 'src/models/stations/entities/stations.entity';
import { KitchenEntity } from 'src/models/kitchens/entities/kitchens.entity';
import { TimeSlotEntity } from 'src/models/timeSlots/entities/timeSlots.entity';
import { ShipperEntity } from 'src/models/shippers/entities/shippers.entity';
@Entity({ name: 'delivery_trips' })
export class DeliveryTripEntity extends BaseEntity {
  @Column()
  @AutoMap()
  status: string;

  // @AutoMap(() => StationEntity)
  // @ManyToOne(() => StationEntity, (station) => station.deliveryTrips)
  // station: StationEntity;

  // @AutoMap(() => KitchenEntity)
  // @ManyToOne(() => KitchenEntity, (kitchen) => kitchen.deliveryTrips)
  // kitchen: KitchenEntity;

  // @AutoMap(() => TimeSlotEntity)
  // @ManyToOne(() => TimeSlotEntity, (timeSlot) => timeSlot.deliveryTrips)
  // timeSlot: TimeSlotEntity;

  // @AutoMap(() => ShipperEntity)
  // @ManyToOne(() => ShipperEntity, (shipper) => shipper.trips)
  // shipper: ShipperEntity;
}
