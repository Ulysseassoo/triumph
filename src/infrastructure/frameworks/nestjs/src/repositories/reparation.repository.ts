import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReparationRepositoryInterface } from '../../../../../application/repositories/ReparationRepositoryInterface';
import { ReparationOrmEntity } from '../../../../database/entities/reparation.orm-entity';
import { Reparation } from "../../../../../domain/entities/reparation.entity";

@Injectable()
export class ReparationRepository implements ReparationRepositoryInterface {
  constructor(
    @InjectRepository(ReparationOrmEntity)
    private readonly repository: Repository<ReparationOrmEntity>,
  ) {}

  async save(reparation: Reparation): Promise<void> {
    await this.repository.save(reparation);
  }

  async findByBreakdownId(breakdownId: string): Promise<Reparation[]> {
    return await this.repository.find({ where: { breakdownId } });
  }
}