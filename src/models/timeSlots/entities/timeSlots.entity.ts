import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/models/base/base.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { DeliveryTripEntity } from 'src/models/deliveryTrips/entities/deliveryTrip.entity';

@Entity({ name: 'timeslots' })
export class TimeSlotEntity extends BaseEntity {
  @Column()
  @AutoMap()
  startTime: string;

  @Column()
  @AutoMap()
  endTime: string;

  @Column()
  @AutoMap()
  flag: number;

  // @OneToMany(() => DeliveryTripEntity, (deliveryTrip) => deliveryTrip.timeSlot)
  // deliveryTrips: DeliveryTripEntity[];
}
