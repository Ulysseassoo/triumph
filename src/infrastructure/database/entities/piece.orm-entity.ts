import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';
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

  @OneToMany(() => OrderOrmEntity, order => order.pieces, { cascade: false})
  orders: OrderOrmEntity[];

  @ManyToOne(() => MaintenanceOrmEntity, maintenance => maintenance.pieces)
  maintenance: MaintenanceOrmEntity;
}