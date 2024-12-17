import { MotoOrmEntity } from './../../../../database/entities/moto.orm-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MotoRepositoryInterface } from "../../../../../application/repositories/MotoRepositoryInterface";
import { Moto } from "../../../../../domain/entities/moto.entity";

@Injectable()
export class MotoRepository implements MotoRepositoryInterface {
  constructor(
    @InjectRepository(MotoOrmEntity)
    private readonly repository: Repository<MotoOrmEntity>,
  ) {}
  create(moto: Moto): Promise<Moto> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Moto | null> {
    throw new Error("Method not implemented.");
  }
  save(moto: Moto): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private toOrmEntity(moto: Moto): MotoOrmEntity {
    const ormMoto = new MotoOrmEntity();
    ormMoto.id = moto.id;
    ormMoto.model = moto.model;
    ormMoto.clientId = moto.clientId;
    ormMoto.currentMileage = moto.currentMileage;
    ormMoto.price = moto.price;
    ormMoto.status = moto.status;
    ormMoto.maintenances = moto.maintenances.map(this.toOrmMaintenanceEntity);
    return ormMoto;
  }
  
  private toDomainEntity(ormMoto: MotoOrmEntity): Moto {
    return new Moto(
      ormMoto.id,
      ormMoto.model,
      ormMoto.clientId,
      ormMoto.currentMileage,
      ormMoto.price,
      ormMoto.status,
      ormMoto.maintenances.map((maintenance) => maintenance.)
    );
  }


  async findAll(): Promise<Moto[]> {
    const motos = await this.repository.find();
    return motos.map(moto => this.toDomainEntity(moto));
  }
}
