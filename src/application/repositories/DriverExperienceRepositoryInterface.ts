import { DriverExperience } from "../../domain/entities/driverExperience.entity";

export type DriverExperienceFiltersType = {
  duration: string;
  type: string;
  rented: boolean;
  professional: boolean;
  feedback: string;
  pagination: {
    offset: number;
    limit: number;
  };
};

export interface DriverExperienceRepositoryInterface {
  create(driverExperience: DriverExperience): Promise<DriverExperience>;
  findById(id: string): Promise<DriverExperience | null>;
  findAll(filters?: DriverExperienceFiltersType): Promise<DriverExperience[]>;
  update(
    id: string,
    driverExperience: Partial<DriverExperience>
  ): Promise<DriverExperience>;
  delete(id: string): Promise<void>;
}
