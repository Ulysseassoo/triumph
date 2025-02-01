import { MotoOrmEntity } from './../../../../database/entities/moto.orm-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotoRepositoryInterface } from '../../../../../application/repositories/MotoRepositoryInterface';
import { Moto } from '../../../../../domain/entities/moto.entity';
import { MotoMapper } from '../../../../database/mappers/moto.mapper';

@Injectable()
export class MotoRepository implements MotoRepositoryInterface {
  constructor(
    @InjectRepository(MotoOrmEntity)
    private readonly repository: Repository<MotoOrmEntity>,
  ) {}

  async create(moto: Moto): Promise<Moto | null> {
    const motoOrmEntity = MotoMapper.toOrmEntity(moto);
    const motoCreated = await this.repository.save(motoOrmEntity);
    return MotoMapper.toDomainEntity(motoCreated);
  }
  findById(id: string): Promise<Moto | null> {
    throw new Error('Method not implemented.');
  }
  save(moto: Moto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Moto[]> {
    const motos = await this.repository.find();
    return motos.map((moto) => MotoMapper.toDomainEntity(moto));
  }
}
