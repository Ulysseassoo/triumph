import { MotoStatus } from "../../../domain/entities/moto.entity";
import { MaintenanceOrmEntity } from './maintenance.orm-entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('moto')
export class MotoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  model: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column({ type: 'int' })
  currentMileage: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'enum', enum: MotoStatus })
  status: MotoStatus;

  @OneToMany(() => MaintenanceOrmEntity, maintenance => maintenance.moto, { cascade: true })
  maintenances: MaintenanceOrmEntity[];
}