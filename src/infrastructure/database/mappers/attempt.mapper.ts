import { Attempt } from "../../../domain/entities/attempt.entity";
import { AttemptOrmEntity } from "../entities/attempt.orm-entity";
import { DriverOrmEntity } from "../entities/driver.orm-entity";
import { MotoOrmEntity } from "../entities/moto.orm-entity";
import { DriverMapper } from "./driver.mapper";
import { DriverExperienceMapper } from "./driverExperience.mapper";
import { DriverLicenseMapper } from "./driverLicense.mapper";
import { MotoMapper } from "./moto.mapper";

export class AttemptMapper {
  static toOrmEntity(attempt: Attempt): AttemptOrmEntity {
    const ormAttempt = new AttemptOrmEntity();
    ormAttempt.id = attempt.id;
    ormAttempt.startDate = attempt.startDate;
    ormAttempt.endDate = attempt.endDate;
    ormAttempt.startKilometer = attempt.startKilometer;
    ormAttempt.endKilometer = attempt.endKilometer;
    ormAttempt.status = attempt.status;
    ormAttempt.moto = MotoMapper.toOrmEntity(attempt.moto) ?? null;
    ormAttempt.driver = DriverMapper.toOrmEntity(attempt.driver) ?? null;
    return ormAttempt;
  }

  static toDomainEntity(ormAttempt: AttemptOrmEntity): Attempt {
    return new Attempt(
      ormAttempt.id,
      ormAttempt.startDate,
      ormAttempt.endDate,
      ormAttempt.startKilometer,
      ormAttempt.endKilometer,
      ormAttempt.status,
      ormAttempt.moto ? MotoMapper.toDomainEntity(ormAttempt.moto) : null,
      ormAttempt.driver ? DriverMapper.toDomainEntity(ormAttempt.driver) : null
    );
  }
}
