import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WarrantyRepositoryInterface } from '../../../../../application/repositories/WarrantyRepositoryInterface';
import { WarrantyOrmEntity } from '../../../../database/entities/warranty.orm-entity';
import { Warranty } from "../../../../../domain/entities/warranty.entity";

@Injectable()
export class WarrantyRepository implements WarrantyRepositoryInterface {
  constructor(
    @InjectRepository(WarrantyOrmEntity)
    private readonly repository: Repository<Warranty>,
  ) {}

  async save(warranty: Warranty): Promise<void> {
    await this.repository.save(warranty);
  }

  async findById(id: string): Promise<Warranty | null> {
    return await this.repository.findOneBy({ id });
  }
}