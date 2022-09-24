import { AutoMap } from '@automapper/classes';

export class BaseDTO {
  @AutoMap()
  public id: string;
}
