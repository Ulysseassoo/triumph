import { DriverExperience } from "../../../domain/entities/driverExperience.entity";
import { DriverExperienceRepositoryInterface } from "../../repositories/driverExperienceRepositoryInterface";

type DriverExperienceFilters = {
  duration: string;
  type: string;
  rented: boolean;
  professional: boolean;
  feedback: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

export class ListDriverExperiencesUseCase {
  constructor(
    private readonly driverExperienceRepo: DriverExperienceRepositoryInterface
  ) {}

  async execute(driverExperienceFilters: DriverExperienceFilters): Promise<{
    data: DriverExperience[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { duration, type, rented, professional, feedback } =
      driverExperienceFilters;
    const { page = 1, limit = 10 } = driverExperienceFilters.pagination;
    const offset = (page - 1) * limit;

    const driverExperiences = await this.driverExperienceRepo.findAll({
      duration,
      type,
      rented,
      professional,
      feedback,
      pagination: { offset, limit },
    });

    return {
      data: driverExperiences,
      total: driverExperiences.length,
      page,
      limit,
    };
  }
}

export class ListDriverExperienceUseCase {
  constructor(
    private readonly driverExperienceRepo: DriverExperienceRepositoryInterface
  ) {}

  async execute(id: string): Promise<{
    data: DriverExperience;
  }> {
    const driverExperience = await this.driverExperienceRepo.findById(id);

    return {
      data: driverExperience,
    };
  }
}
