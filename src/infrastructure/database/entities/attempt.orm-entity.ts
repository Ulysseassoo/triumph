import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MotoOrmEntity } from "./moto.orm-entity";
import { DriverOrmEntity } from "./driver.orm-entity";

export enum AttemptStatus {
  CANCEL = "Annulé",
  FINISHED = "Terminé",
  GOING = "En cours",
}
@Entity("attempt")
export class AttemptOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  startKilometer: number;

  @Column()
  endKilometer: number;

  @Column({ type: "enum", enum: AttemptStatus, nullable: true })
  status: AttemptStatus;

  @ManyToOne(() => MotoOrmEntity, (moto) => moto.attempts, {
    onDelete: "CASCADE",
  })
  moto: MotoOrmEntity;

  @ManyToOne(() => DriverOrmEntity, (driver) => driver.attempts, {
    onDelete: "CASCADE",
  })
  driver: DriverOrmEntity;
}
