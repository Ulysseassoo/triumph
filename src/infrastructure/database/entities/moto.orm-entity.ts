import { MotoStatus } from "../../../domain/entities/moto.entity";
import { MaintenanceOrmEntity } from "./maintenance.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { PartnerOrmEntity } from "./partner.orm-entity";
import { CrashOrmEntity } from "./crash.orm-entity";
import { AttemptOrmEntity } from "./attempt.orm-entity";

@Entity("moto")
export class MotoOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  model: string;

  @Column({ type: "int" })
  currentMileage: number;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "enum", enum: MotoStatus })
  status: MotoStatus;

  @OneToMany(() => MaintenanceOrmEntity, (maintenance) => maintenance.moto, {
    cascade: true,
    eager: true,
  })
  maintenances: MaintenanceOrmEntity[];

  @ManyToOne(() => PartnerOrmEntity, (partner) => partner.motos, {
    eager: true,
  })
  @JoinColumn({ name: "clientPartnerId" })
  partner: PartnerOrmEntity;

  @OneToMany(() => CrashOrmEntity, (crash) => crash.moto)
  crashes: CrashOrmEntity[];

  @OneToMany(() => AttemptOrmEntity, (attempt) => attempt.moto)
  attempts: AttemptOrmEntity[];
}
