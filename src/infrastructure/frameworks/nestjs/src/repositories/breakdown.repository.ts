import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreakdownRepositoryInterface } from '../../../../../application/repositories/BreakdownRepositoryInterface';
import { BreakdownOrmEntity } from '../../../../database/entities/breakdown.orm-entity';
import { Breakdown } from '../../../../../domain/entities/breakdown.entity';
import { BreakdownMapper } from '../../../../database/mappers/breakdown.mapper';

@Injectable()
export class BreakdownRepository implements BreakdownRepositoryInterface {
  constructor(
    @InjectRepository(BreakdownOrmEntity)
    private readonly repository: Repository<BreakdownOrmEntity>,
  ) {}

  async save(breakdown: Breakdown): Promise<void> {
    await this.repository.save(breakdown);
  }

  async findById(id: string): Promise<Breakdown | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByMotoId(motoId: string): Promise<Breakdown[]> {
    return await this.repository.find({ where: { motoId } });
  }

  async findAll(): Promise<Breakdown[]> {
    const warranties = await this.repository.find();
    return warranties.map((breakdown) => BreakdownMapper.toOrmEntity(breakdown));
  }
}
