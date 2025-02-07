import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DriverOrmEntity } from "./driver.orm-entity";
import { MotoOrmEntity } from "./moto.orm-entity";

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

  @Column()
  status: string;

  @OneToMany(() => DriverOrmEntity, (driver) => driver.crash)
  driver: DriverOrmEntity;

  @OneToMany(() => MotoOrmEntity, (moto) => moto.crash)
  moto: MotoOrmEntity;
}
