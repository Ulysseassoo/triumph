import { Crash } from "../../domain/entities/Crash.entity";

export type CrashFiltersType = {
  type: string;
  date: string;
  description: string;
  location: string;
  responsability: string;
  consequence: string;
  status: string;
  pagination: {
    offset: number;
    limit: number;
  };
};

export interface CrashRepositoryInterface {
  create(crash: Crash): Promise<Crash>;
  findById(id: string): Promise<Crash | null>;
  findAll(filters?: CrashFiltersType): Promise<Crash[]>;
  update(id: string, crash: Partial<Crash>): Promise<Crash>;
  delete(id: string): Promise<void>;
}
