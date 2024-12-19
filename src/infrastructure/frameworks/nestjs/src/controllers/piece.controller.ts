import { Controller } from '@nestjs/common';
import { PieceService } from 'src/services/piece.service';

@Controller('pieces')
export class PieceController {
  constructor(private readonly pieceService: PieceService) {}
}
