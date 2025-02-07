import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DriverOrmEntity } from "./driver.orm-entity";

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

  @Column()
  status: string;

  @ManyToOne(() => DriverOrmEntity, (driver) => driver.licenses)
  driver: DriverOrmEntity;
}
