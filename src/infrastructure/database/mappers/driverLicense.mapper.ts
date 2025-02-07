import { DriverLicense } from "../../../domain/entities/driverLicense.entity";
import { DriverLicenseOrmEntity } from "../entities/driverLicense.orm-entity";
import { DriverMapper } from "./driver.mapper";

export class DriverLicenseMapper {
  static toOrmEntity(license: DriverLicense): DriverLicenseOrmEntity {
    const ormLicense = new DriverLicenseOrmEntity();
    ormLicense.id = license.id;
    ormLicense.licenseNumber = license.licenseNumber;
    ormLicense.category = license.category;
    ormLicense.expiryDate = license.expiryDate;
    ormLicense.obtainDate = license.obtainDate;
    ormLicense.country = license.country;
    ormLicense.status = license.status;
    ormLicense.driver = license.driver
      ? DriverMapper.toOrmEntity(license.driver)
      : null;
    return ormLicense;
  }

  static toDomainEntity(ormLicense: DriverLicenseOrmEntity): DriverLicense {
    return new DriverLicense(
      ormLicense.id,
      ormLicense.licenseNumber,
      ormLicense.category,
      ormLicense.expiryDate,
      ormLicense.obtainDate,
      ormLicense.country,
      ormLicense.status,
      ormLicense.driver ? DriverMapper.toDomainEntity(ormLicense.driver) : null
    );
  }
}
