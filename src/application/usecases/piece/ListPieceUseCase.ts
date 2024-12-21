import { Piece } from "../../../domain/entities/piece.entity";
import { PieceRepositoryInterface } from "../../repositories/PieceRepositoryInterface";

interface PieceFilterOptions {
  name?: string;
  type?: string;
  cost?: number;
  quantity?: number;
  alertLimit?: number;
}

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export class ListOrderUseCase {
  constructor(private readonly PieceRepository: PieceRepositoryInterface) {}

  async execute(
    filterOptions: PieceFilterOptions = {},
    paginationOptions: PaginationOptions = {}
  ): Promise<{
    data: Piece[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { name,type,cost,quantity,alertLimit } = filterOptions;
    const { page = 1, limit = 10 } = paginationOptions;
    const offset = (page - 1) * limit;

    const pieces = await this.PieceRepository.findAllFilters({
      filters: { name,type,cost,quantity,alertLimit },
      pagination: { offset, limit }
    });

    return {
      data: pieces,
      total: pieces.length,
      page,
      limit
    };
  }
}