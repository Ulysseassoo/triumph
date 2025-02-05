import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CorrectiveActionOrmEntity } from '../../../../database/entities/corrective-action.orm-entity';
import { CorrectiveActionRepository } from '../repositories/corrective-action.repository';
import { CorrectiveActionController } from '../controllers/corrective-action.controller';
import { CorrectiveActionService } from '../services/corrective-action.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CorrectiveActionOrmEntity]),
  ],
  controllers: [CorrectiveActionController],
  providers: [
    CorrectiveActionService,
    CorrectiveActionRepository,
    {
      provide: 'CorrectiveActionRepositoryInterface',
      useClass: CorrectiveActionRepository,
    },
  ],
  exports: [CorrectiveActionService, 'CorrectiveActionRepositoryInterface', TypeOrmModule],
})
export class CorrectiveActionModule {}