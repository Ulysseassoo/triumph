import { DriverExperience } from "../../../domain/entities/driverExperience.entity";
import { DriverExperienceRepositoryInterface } from "../../repositories/driverExperienceRepositoryInterface";

export class UpdateDriverExperienceUseCase {
  constructor(
    private readonly driverExperienceRepo: DriverExperienceRepositoryInterface
  ) {}

  async execute({
    id,
    duration,
    type,
    rented,
    professional,
    feedback,
    driver,
  }: DriverExperience): Promise<DriverExperience> {
    const driverExperience = await this.driverExperienceRepo.findById(id);

    if (!driverExperience) {
      throw new Error(`DriverExperience does not exist with id: ${id}`);
    }

    const updateData = {
      ...(duration && { duration }),
      ...(type && { type }),
      ...(rented && { rented }),
      ...(professional && { professional }),
      ...(feedback && { feedback }),
      ...(driver && { driver }),
    };

    const updatedDriverExperience = await this.driverExperienceRepo.update(
      id,
      updateData
    );
    if (!updatedDriverExperience) {
      throw new Error(`Failed to update driverExperience with id: ${id}`);
    }

    return updatedDriverExperience;
  }
}
