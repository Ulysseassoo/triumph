import { MaintenanceOrmEntity } from './../entities/maintenance.orm-entity';
import { Maintenance } from '../../../domain/entities/maintenance.entity';
import { PieceMapper } from './piece.mapper';

export class MaintenanceMapper {
  static toOrmEntity(maintenance: Maintenance): MaintenanceOrmEntity {
    const ormMaintenance = new MaintenanceOrmEntity();
    ormMaintenance.id = maintenance.id;
    ormMaintenance.motoId = maintenance.motoId;
    ormMaintenance.maintenanceType = maintenance.maintenanceType;
    ormMaintenance.plannedDate = maintenance.plannedDate;
    ormMaintenance.mileage = maintenance.mileage;
    ormMaintenance.achievedDate = maintenance.achievedDate;
    ormMaintenance.maintenanceInterval = maintenance.maintenanceInterval;
    ormMaintenance.recommandations = maintenance.recommandations;
    ormMaintenance.cost = maintenance.cost;
    ormMaintenance.pieces = maintenance.pieces.map(PieceMapper.toOrmEntity);
    return ormMaintenance;
  }

  static toDomainEntity(ormMaintenance: MaintenanceOrmEntity): Maintenance {
    return new Maintenance(
      ormMaintenance.id,
      ormMaintenance.motoId,
      ormMaintenance.maintenanceType,
      ormMaintenance.plannedDate,
      ormMaintenance.mileage,
      ormMaintenance.achievedDate,
      ormMaintenance.maintenanceInterval,
      ormMaintenance.recommandations,
      ormMaintenance.cost,
      ormMaintenance.pieces.map(PieceMapper.toDomainEntity)
    );
  }
}