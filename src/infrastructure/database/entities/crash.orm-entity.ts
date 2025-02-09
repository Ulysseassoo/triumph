import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DriverOrmEntity } from "./driver.orm-entity";
import { MotoOrmEntity } from "./moto.orm-entity";
import { CrashStatus } from "../../../domain/entities/crash.entity";

@Entity("crash")
export class CrashOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  responsability: string;

  @Column()
  consequence: string;

  @Column({ type: "enum", enum: CrashStatus, nullable: true })
  status: CrashStatus;

  @ManyToOne(() => DriverOrmEntity, (driver) => driver.crashes, {
    onDelete: "CASCADE",
  })
  driver: DriverOrmEntity;

  @ManyToOne(() => MotoOrmEntity, (moto) => moto.crashes, {
    onDelete: "CASCADE",
  })
  moto: MotoOrmEntity;
}
