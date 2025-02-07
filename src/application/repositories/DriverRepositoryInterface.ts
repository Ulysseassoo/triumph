import { Driver } from "../../domain/entities/driver.entity";

export type filtersType = {
  firstname: string;
  lastname: string;
  birthdate: string;
  addresse: string;
  pagination: {
    offset: number;
    limit: number;
  };
};

export interface DriverRepositoryInterface {
  create(driver: Driver): Promise<Driver>;
  findById(id: string): Promise<Driver | null>;
  findAll(filters?: filtersType): Promise<Driver[]>;
  update(id: string, driver: Partial<Driver>): Promise<Driver>;
  delete(id: string): Promise<void>;
}
