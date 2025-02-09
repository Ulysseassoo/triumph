import { MotoOrmEntity } from "./../entities/moto.orm-entity";
import { Moto } from "../../../domain/entities/moto.entity";
import { MaintenanceMapper } from "./maintenance.mapper";
import { PartnerMapper } from "./partner.mapper";
import { AttemptMapper } from "./attempt.mapper";

export class MotoMapper {
  static toOrmEntity(moto: Moto): MotoOrmEntity {
    const ormMoto = new MotoOrmEntity();
    ormMoto.id = moto.id;
    ormMoto.model = moto.model;
    ormMoto.partner = PartnerMapper.toOrmEntity(moto.partner);
    ormMoto.currentMileage = moto.currentMileage;
    ormMoto.price = moto.price;
    ormMoto.status = moto.status;
    ormMoto.maintenances = moto.maintenances.map(MaintenanceMapper.toOrmEntity);
    ormMoto.attempts = moto?.attempts?.map(AttemptMapper.toOrmEntity) || [];
    return ormMoto;
  }

  static toDomainEntity(ormMoto: MotoOrmEntity): Moto {
    return new Moto(
      ormMoto.id,
      ormMoto.model,
      PartnerMapper.toDomainEntity(ormMoto.partner),
      ormMoto.currentMileage,
      ormMoto.price,
      ormMoto.status,
      ormMoto.maintenances.map(MaintenanceMapper.toDomainEntity),
      ormMoto.attempts ? ormMoto.attempts.map(AttemptMapper.toDomainEntity) : []
    );
  }
}
