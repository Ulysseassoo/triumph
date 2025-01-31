import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotificationOrmEntity } from '../../../../database/entities/notification.orm-entity';
import { NotificationController } from 'src/controllers/notification.controller';
import { NotificationService } from 'src/services/notification.service';
import { NotificationRepository } from 'src/repositories/notification.repository';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([NotificationOrmEntity, UserOrmEntity]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
    {
      provide: 'NotificationRepositoryInterface',
      useClass: NotificationRepository,
    },
  ],
  exports: [NotificationService, 'NotificationRepositoryInterface', TypeOrmModule],
})
export class NotificationModule {}