import { BreakdownOrmEntity } from './../entities/breakdown.orm-entity';
import { Breakdown } from '../../../domain/entities/breakdown.entity';
import { ReparationMapper } from './reparation.mapper';

export class BreakdownMapper {
  static toOrmEntity(breakdown: Breakdown): BreakdownOrmEntity {
    const ormBreakdown = new BreakdownOrmEntity();
    ormBreakdown.id = breakdown.id;
    ormBreakdown.motoId = breakdown.motoId;
    ormBreakdown.description = breakdown.description;
    ormBreakdown.date = breakdown.date;
    ormBreakdown.warranty = breakdown.warranty ? WarrantyMapper.toOrmEntity(breakdown.warranty) : null;
    ormBreakdown.reparations = breakdown.reparations.map(ReparationMapper.toOrmEntity);
    return ormBreakdown;
  }

  static toDomainEntity(ormBreakdown: BreakdownOrmEntity): Breakdown {
    return new Breakdown(
      ormBreakdown.id,
      ormBreakdown.motoId,
      ormBreakdown.description,
      ormBreakdown.date,
      ormBreakdown.warranty ? WarrantyMapper.toDomainEntity(ormBreakdown.warranty) : null,
      ormBreakdown.reparations.map(ReparationMapper.toDomainEntity)
    );
  }
}