import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MaintenanceInterval, MaintenanceType } from './../../../domain/entities/maintenance.entity';

@Entity('maintenance')
export class MaintenanceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  motoId: string;

  @Column({ type: 'enum', enum: MaintenanceType })
  maintenanceType: MaintenanceType;

  @Column({ type: 'date' })
  plannedDate: Date;

  @Column({ type: 'int' })
  mileage: number;

  @Column({ type: 'date', nullable: true })
  achievedDate: Date | null;

  @Column({ type: 'json' })
  maintenanceInterval: MaintenanceInterval;

  @Column({ type: 'text', nullable: true })
  recommandations: string | null;

  @Column({ type: 'decimal', nullable: true })
  cost: number | null;
}