import { DriverExperienceRepositoryInterface } from "../../repositories/DriverExperienceRepositoryInterface";

export class DeleteDriverExperienceUseCase {
  constructor(
    private readonly driverExperienceRepo: DriverExperienceRepositoryInterface
  ) {}

  async execute(id: string): Promise<void> {
    const driverExperience = await this.driverExperienceRepo.findById(id);

    if (!driverExperience) {
      throw new Error(`DriverExperience does not exist with id : ${id}`);
    }

    return await this.driverExperienceRepo.delete(id);
  }
}
