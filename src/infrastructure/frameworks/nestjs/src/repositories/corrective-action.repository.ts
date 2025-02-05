import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CorrectiveActionRepositoryInterface } from '../../../../../application/repositories/CorrectiveActionRepositoryInterface';
import { CorrectiveActionOrmEntity } from '../../../../database/entities/corrective-action.orm-entity';
import { CorrectiveAction } from "../../../../../domain/entities/corrective-action.entity";

@Injectable()
export class CorrectiveActionRepository implements CorrectiveActionRepositoryInterface {
  constructor(
    @InjectRepository(CorrectiveActionOrmEntity)
    private readonly repository: Repository<CorrectiveActionOrmEntity>,
  ) {}

  async save(correctiveAction: CorrectiveAction): Promise<void> {
    await this.repository.save(correctiveAction);
  }

  async findByReparationId(reparationId: string): Promise<CorrectiveAction[]> {
    return await this.repository.find({ where: { reparationId } });
  }
}