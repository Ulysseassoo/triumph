import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerOrmEntity } from '../../../../database/entities/partner.orm-entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { PartnerRepositoryInterface } from '../../../../../application/repositories/PartnerRepositoryInterface';
import { Partner } from '../../../../../domain/entities/partner.entity';
import { PartnerMapper } from '../../../../database/mappers/partner.mapper';
import { User } from '../../../../../domain/entities/user.entity';
import { UserMapper } from '../../../../database/mappers/user.mapper';

@Injectable()
export class PartnerRepository implements PartnerRepositoryInterface {
  constructor(
    @InjectRepository(PartnerOrmEntity)
    private readonly repository: Repository<PartnerOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async create(partner: Partner): Promise<Partner> {
    const ormEntity = PartnerMapper.toOrmEntity(partner);
    const savedEntity = await this.repository.save(ormEntity);
    return PartnerMapper.toDomainEntity(savedEntity);
  }

  async findById(id: string): Promise<Partner | null> {
    const ormEntity = await this.repository.findOneBy({ id });
    if (!ormEntity) return null;
    return PartnerMapper.toDomainEntity(ormEntity);
  }

  async findAll(): Promise<Partner[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(PartnerMapper.toDomainEntity);
  }

  async update(id: string, partnerData: Partial<Partner>): Promise<void> {
    await this.repository.update(id, partnerData);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findUsersByPartnerId(partnerId: string): Promise<User[]> {
    const users = await this.userRepository.find({ where: { partner: { id: partnerId } } });
    return users.map(UserMapper.toDomainEntity);
  }
}