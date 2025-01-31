import { PartnerRepositoryInterface } from './../../../../../application/repositories/PartnerRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class PartnerService {
  constructor(
    @Inject('PartnerRepositoryInterface')
    private readonly partnerRepository: PartnerRepositoryInterface,
  ) {}
}
