import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DriverOrmEntity } from "./driver.orm-entity";
import { DriverLicenseStatus } from "../../../domain/entities/driverLicense.entity";

@Entity("driverLicense")
export class DriverLicenseOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  licenseNumber: string;

  @Column()
  category: string;

  @Column()
  expiryDate: Date;

  @Column()
  obtainDate: Date;

  @Column()
  country: string;

  @Column({ type: "enum", enum: DriverLicenseStatus, nullable: true })
  status: DriverLicenseStatus;

  @ManyToOne(() => DriverOrmEntity, (driver) => driver.licenses)
  driver: DriverOrmEntity;
}
