import { Crash } from "../../../domain/entities/crash.entity";
import { CrashRepositoryInterface } from "../../repositories/CrashRepositoryInterface";

type CrashFilters = {
  type: string;
  date: string;
  description: string;
  location: string;
  responsability: string;
  consequence: string;
  status: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

export class ListCrashesUseCase {
  constructor(private readonly crashRepo: CrashRepositoryInterface) {}

  async execute(crashFilters: CrashFilters): Promise<{
    data: Crash[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      type,
      date,
      location,
      description,
      responsability,
      consequence,
      status,
    } = crashFilters;
    const { page = 1, limit = 10 } = crashFilters.pagination;
    const offset = (page - 1) * limit;

    const crashes = await this.crashRepo.findAll({
      type,
      date,
      location,
      status,
      description,
      responsability,
      consequence,
      pagination: { offset, limit },
    });

    return {
      data: crashes,
      total: crashes.length,
      page,
      limit,
    };
  }
}

export class ListCrashUseCase {
  constructor(private readonly crashRepo: CrashRepositoryInterface) {}

  async execute(id: string): Promise<{
    data: Crash;
  }> {
    const crash = await this.crashRepo.findById(id);

    return {
      data: crash,
    };
  }
}
