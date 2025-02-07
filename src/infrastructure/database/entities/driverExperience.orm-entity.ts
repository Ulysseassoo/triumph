import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { DriverOrmEntity } from "./driver.orm-entity";

@Entity("driverExperience")
export class DriverExperienceOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  duration: number;

  @Column()
  type: string;

  @Column()
  rented: boolean;

  @Column()
  professional: boolean;

  @Column()
  feedback: string;

  @ManyToOne(() => DriverOrmEntity, (driver) => driver.experiences)
  driver: DriverOrmEntity;
}
