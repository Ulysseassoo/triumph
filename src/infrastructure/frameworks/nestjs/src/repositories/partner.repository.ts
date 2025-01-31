import { Injectable } from '@nestjs/common';
import { PartnerRepositoryInterface } from "../../../../../application/repositories/PartnerRepositoryInterface";

@Injectable()
export class PartnerRepository implements PartnerRepositoryInterface {
  constructor(
  ) {}
}
