import { v4 } from "uuid";
import { DriverExperience } from "../../../domain/entities/driverExperience.entity";
import { DriverExperienceRepositoryInterface } from "../../repositories/DriverExperienceRepositoryInterface";

export type DriverExperienceWithoutId = Omit<DriverExperience, "id">;

export class CreateDriverExperienceUseCase {
  constructor(
    private readonly driverExperienceRepository: DriverExperienceRepositoryInterface
  ) {}

  async execute({
    duration,
    type,
    rented,
    professional,
    feedback,
    driver,
  }: DriverExperienceWithoutId): Promise<DriverExperience | null> {
    const experience = new DriverExperience(
      v4(),
      duration,
      type,
      rented,
      professional,
      feedback,
      driver
    );

    const newExperience = await this.driverExperienceRepository.create(
      experience
    );

    return newExperience;
  }
}
