import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MaintenanceOrmEntity } from "./maintenance.orm-entity";

@Entity('piece')
export class PieceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'decimal', nullable: false })
  cost: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  alertLimit: number;

  @ManyToOne(() => MaintenanceOrmEntity, maintenance => maintenance.pieces)
  maintenance: MaintenanceOrmEntity;
}