import { CorrectiveActionOrmEntity } from './../entities/corrective-action.orm-entity';
import { CorrectiveAction } from '../../../domain/entities/corrective-action.entity';

export class CorrectiveActionMapper {
  static toOrmEntity(correctiveAction: CorrectiveAction): CorrectiveActionOrmEntity {
    const ormCorrectiveAction = new CorrectiveActionOrmEntity();
    ormCorrectiveAction.id = correctiveAction.id;
    ormCorrectiveAction.reparationId = correctiveAction.reparationId;
    ormCorrectiveAction.description = correctiveAction.description;
    ormCorrectiveAction.date = correctiveAction.date;
    return ormCorrectiveAction;
  }

  static toDomainEntity(ormCorrectiveAction: CorrectiveActionOrmEntity): CorrectiveAction {
    return new CorrectiveAction(
      ormCorrectiveAction.id,
      ormCorrectiveAction.reparationId,
      ormCorrectiveAction.description,
      ormCorrectiveAction.date
    );
  }
}