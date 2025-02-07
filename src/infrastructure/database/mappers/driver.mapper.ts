import { Driver } from "../../../domain/entities/driver.entity";
import { DriverOrmEntity } from "../entities/driver.orm-entity";
import { CrashMapper } from "./crash.mapper";
import { DriverExperienceMapper } from "./driverExperience.mapper";
import { DriverLicenseMapper } from "./driverLicense.mapper";

export class DriverMapper {
  static toOrmEntity(driver: Driver): DriverOrmEntity {
    const ormDriver = new DriverOrmEntity();
    ormDriver.id = driver.id;
    ormDriver.firstname = driver.firstname;
    ormDriver.lastname = driver.lastname;
    ormDriver.birthdate = driver.birthdate;
    ormDriver.addresse = driver.addresse;
    ormDriver.licenses =
      driver.licenses?.map(DriverLicenseMapper.toOrmEntity) || [];
    ormDriver.experiences =
      driver.experiences?.map(DriverExperienceMapper.toOrmEntity) || [];
    ormDriver.crash = driver.crash
      ? CrashMapper.toOrmEntity(driver.crash)
      : null;
    return ormDriver;
  }

  static toDomainEntity(ormDriver: DriverOrmEntity): Driver {
    return new Driver(
      ormDriver.id,
      ormDriver.firstname,
      ormDriver.lastname,
      ormDriver.birthdate,
      ormDriver.addresse,
      ormDriver.licenses?.map(DriverLicenseMapper.toDomainEntity) || [],
      ormDriver.experiences?.map(DriverExperienceMapper.toDomainEntity) || [],
      ormDriver.crash ? CrashMapper.toDomainEntity(ormDriver.crash) : null
    );
  }
}
