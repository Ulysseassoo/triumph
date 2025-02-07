import { Attempt } from "../../domain/entities/Attempt.entity";

export type AttemptFiltersType = {
  startDate: string;
  endDate: string;
  startKilometer: number;
  endKilometer: number;
  status: string;
  pagination: {
    offset: number;
    limit: number;
  };
};

export interface AttemptRepositoryInterface {
  create(attempt: Attempt): Promise<Attempt>;
  findById(id: string): Promise<Attempt | null>;
  findAll(filters?: AttemptFiltersType): Promise<Attempt[]>;
  update(id: string, attempt: Partial<Attempt>): Promise<Attempt>;
  delete(id: string): Promise<void>;
}
