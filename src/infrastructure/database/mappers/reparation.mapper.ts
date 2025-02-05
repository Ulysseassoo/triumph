import { ReparationOrmEntity } from './../entities/reparation.orm-entity';
import { Reparation } from '../../../domain/entities/reparation.entity';
import { CorrectiveActionMapper } from './corrective-action.mapper';

export class ReparationMapper {
  static toOrmEntity(reparation: Reparation): ReparationOrmEntity {
    const ormReparation = new ReparationOrmEntity();
    ormReparation.id = reparation.id;
    ormReparation.breakdownId = reparation.breakdownId;
    ormReparation.date = reparation.date;
    ormReparation.description = reparation.description;
    ormReparation.cost = reparation.cost;
    ormReparation.correctiveActions = reparation.correctiveActions.map(CorrectiveActionMapper.toOrmEntity);
    return ormReparation;
  }

  static toDomainEntity(ormReparation: ReparationOrmEntity): Reparation {
    return new Reparation(
      ormReparation.id,
      ormReparation.breakdownId,
      ormReparation.date,
      ormReparation.description,
      ormReparation.cost,
      ormReparation.correctiveActions.map(CorrectiveActionMapper.toDomainEntity)
    );
  }
}