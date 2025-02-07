import { Attempt } from "../../../domain/entities/attempt.entity";
import { AttemptOrmEntity } from "../entities/attempt.orm-entity";
import { DriverExperienceMapper } from "./driverExperience.mapper";
import { DriverLicenseMapper } from "./driverLicense.mapper";

export class AttemptMapper {
  static toOrmEntity(attempt: Attempt): AttemptOrmEntity {
    const ormAttempt = new AttemptOrmEntity();
    ormAttempt.id = attempt.id;
    ormAttempt.startDate = attempt.startDate;
    ormAttempt.endDate = attempt.endDate;
    ormAttempt.startKilometer = attempt.startKilometer;
    ormAttempt.endKilometer = attempt.endKilometer;
    ormAttempt.status = attempt.status;
    ormAttempt.licenses =
      attempt.licenses?.map(DriverLicenseMapper.toOrmEntity) || [];
    ormAttempt.experiences =
      attempt.experiences?.map(DriverExperienceMapper.toOrmEntity) || [];
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
      ormAttempt.licenses?.map(DriverLicenseMapper.toDomainEntity) || [],
      ormAttempt.experiences?.map(DriverExperienceMapper.toDomainEntity) || []
    );
  }
}
