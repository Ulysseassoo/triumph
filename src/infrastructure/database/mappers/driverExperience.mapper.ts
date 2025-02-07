import { DriverExperience } from "../../../domain/entities/driverExperience.entity";
import { DriverExperienceOrmEntity } from "../entities/driverExperience.orm-entity";
import { DriverMapper } from "./driver.mapper";

export class DriverExperienceMapper {
  static toOrmEntity(experience: DriverExperience): DriverExperienceOrmEntity {
    const ormExperience = new DriverExperienceOrmEntity();
    ormExperience.id = experience.id;
    ormExperience.duration = experience.duration;
    ormExperience.type = experience.type;
    ormExperience.rented = experience.rented;
    ormExperience.professional = experience.professional;
    ormExperience.feedback = experience.feedback;
    ormExperience.driver = experience.driver
      ? DriverMapper.toOrmEntity(experience.driver)
      : null;
    return ormExperience;
  }

  static toDomainEntity(
    ormExperience: DriverExperienceOrmEntity
  ): DriverExperience {
    return new DriverExperience(
      ormExperience.id,
      ormExperience.duration,
      ormExperience.type,
      ormExperience.rented,
      ormExperience.professional,
      ormExperience.feedback,
      ormExperience.driver
        ? DriverMapper.toDomainEntity(ormExperience.driver)
        : null
    );
  }
}
