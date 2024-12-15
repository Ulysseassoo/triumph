import { UserDomain } from "../../../domain/entities/UserDomain";
import { UserRepositoryInterface } from './../../repositories/UserRepository';

interface UserFilterOptions {
  name?: string;
  email?: string;
  role?: Array<String>;
}

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export class ListUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(
    filterOptions: UserFilterOptions = {},
    paginationOptions: PaginationOptions = {}
  ): Promise<{
    data: UserDomain[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { name, email , role } = filterOptions;
    const { page = 1, limit = 10 } = paginationOptions;
    const offset = (page - 1) * limit;

    const users = await this.userRepository.findAllFilters({
      filters: { name, email , role},
      pagination: { offset, limit }
    });

    return {
      data: users,
      total: users.length,
      page,
      limit
    };
  }
}