import { MotoOrmEntity } from './../entities/moto.orm-entity';
import { Moto } from '../../../domain/entities/moto.entity';
import { MaintenanceMapper } from './maintenance.mapper';

export class MotoMapper {
  static toOrmEntity(moto: Moto): MotoOrmEntity {
    const ormMoto = new MotoOrmEntity();
    ormMoto.id = moto.id;
    ormMoto.model = moto.model;
    ormMoto.clientId = moto.clientId;
    ormMoto.currentMileage = moto.currentMileage;
    ormMoto.price = moto.price;
    ormMoto.status = moto.status;
    ormMoto.maintenances = moto.maintenances.map(MaintenanceMapper.toOrmEntity);
    return ormMoto;
  }

  static toDomainEntity(ormMoto: MotoOrmEntity): Moto {
    return new Moto(
      ormMoto.id,
      ormMoto.model,
      ormMoto.clientId,
      ormMoto.currentMileage,
      ormMoto.price,
      ormMoto.status,
      ormMoto.maintenances.map(MaintenanceMapper.toDomainEntity)
    );
  }
}