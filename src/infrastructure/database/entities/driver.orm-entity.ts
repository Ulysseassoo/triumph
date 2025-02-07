import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { DriverLicenseOrmEntity } from "./driverLicense.orm-entity";
import { DriverExperienceOrmEntity } from "./driverExperience.orm-entity";
import { CrashOrmEntity } from "./crash.orm-entity";

@Entity("driver")
export class DriverOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birthdate: Date;

  @Column()
  addresse: string;

  @OneToMany(() => DriverLicenseOrmEntity, (license) => license.driver)
  licenses: DriverLicenseOrmEntity[];

  @OneToMany(
    () => DriverExperienceOrmEntity,
    (driverExperience) => driverExperience.driver
  )
  experiences: DriverExperienceOrmEntity[];

  @ManyToOne(() => CrashOrmEntity, (crash) => crash.driver)
  crash: CrashOrmEntity;
}
