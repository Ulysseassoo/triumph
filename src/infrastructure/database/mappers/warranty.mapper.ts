import { WarrantyOrmEntity } from './../entities/warranty.orm-entity';
import { Warranty } from '../../../domain/entities/warranty.entity';
import { BreakdownMapper } from './breakdown.mapper';

export class WarrantyMapper {
  static toOrmEntity(warranty: Warranty): WarrantyOrmEntity {
    const ormWarranty = new WarrantyOrmEntity();
    ormWarranty.id = warranty.id;
    ormWarranty.motoId = warranty.motoId;
    ormWarranty.startDate = warranty.startDate;
    ormWarranty.endDate = warranty.endDate;
    ormWarranty.breakdowns = warranty.breakdowns.map(BreakdownMapper.toOrmEntity);
    return ormWarranty;
  }

  static toDomainEntity(ormWarranty: WarrantyOrmEntity): Warranty {
    return new Warranty(
      ormWarranty.id,
      ormWarranty.motoId,
      ormWarranty.startDate,
      ormWarranty.endDate,
      ormWarranty.breakdowns.map(BreakdownMapper.toDomainEntity)
    );
  }
}