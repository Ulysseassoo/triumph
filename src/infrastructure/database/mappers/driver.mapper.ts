import { Driver } from "../../../domain/entities/driver.entity";
import { DriverOrmEntity } from "../entities/driver.orm-entity";
import { AttemptMapper } from "./attempt.mapper";
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
    ormDriver.crashes = driver.crashes?.map(CrashMapper.toOrmEntity) || [];
    ormDriver.attempts = driver.attempts?.map(AttemptMapper.toOrmEntity) || [];
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
      ormDriver.crashes?.map(CrashMapper.toDomainEntity) || [],
      ormDriver.attempts?.map(AttemptMapper.toDomainEntity) || []
    );
  }
}
