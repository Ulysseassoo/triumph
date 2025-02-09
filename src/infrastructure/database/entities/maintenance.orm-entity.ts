import { PieceOrmEntity } from "./piece.orm-entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import {
  MaintenanceInterval,
  MaintenanceType,
} from "./../../../domain/entities/maintenance.entity";
import { MotoOrmEntity } from "./moto.orm-entity";

@Entity("maintenance")
export class MaintenanceOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  motoId: string;

  @Column({
    type: "simple-enum",
    enum: MaintenanceType,
    default: MaintenanceType.PREVENTIF,
  })
  maintenanceType: MaintenanceType;

  @Column({ type: "date" })
  plannedDate: Date;

  @Column({ type: "int" })
  mileage: number;

  @Column({ type: "date", nullable: true })
  achievedDate: Date | null;

  @Column({ type: "json" })
  maintenanceInterval: MaintenanceInterval;

  @Column({ type: "text", nullable: true })
  recommandations: string | null;

  @Column({ type: "decimal", nullable: true })
  cost: number | null;

  @ManyToOne(() => MotoOrmEntity, (moto) => moto.maintenances)
  moto: MotoOrmEntity;

  @OneToMany(() => PieceOrmEntity, (piece) => piece.maintenance, {
    cascade: true,
    eager: true,
  })
  pieces: PieceOrmEntity[];
}
