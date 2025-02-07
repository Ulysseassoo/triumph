import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DriverLicenseOrmEntity } from "./driverLicense.orm-entity";
import { DriverExperienceOrmEntity } from "./driverExperience.orm-entity";

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

  @Column()
  status: string;

  @OneToMany(() => DriverLicenseOrmEntity, (license) => license.driver)
  licenses: DriverLicenseOrmEntity[];

  @OneToMany(
    () => DriverExperienceOrmEntity,
    (driverExperience) => driverExperience.driver
  )
  experiences: DriverExperienceOrmEntity[];
}
