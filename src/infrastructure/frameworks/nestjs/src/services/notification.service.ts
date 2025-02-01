import { NotificationRepositoryInterface } from './../../../../../application/repositories/NotificationRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NotificationRepositoryInterface')
    private readonly pieceRepository: NotificationRepositoryInterface,
  ) {}
}