import { Controller } from '@nestjs/common';
import { PartnerService } from 'src/services/partner.service';

@Controller('partners')
export class ParnterController {
  constructor(private readonly motoService: PartnerService) {}
}
