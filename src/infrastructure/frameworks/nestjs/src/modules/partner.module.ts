import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { PartnerOrmEntity } from '../../../../database/entities/partner.orm-entity';
import { ParnterController } from 'src/controllers/partner.controller';
import { PartnerService } from 'src/services/partner.service';
import { PartnerRepository } from 'src/repositories/partner.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PartnerOrmEntity, UserOrmEntity]),
  ],
  controllers: [ParnterController],
  providers: [
    PartnerService,
    PartnerRepository,
    {
      provide: 'PartnerRepositoryInterface',
      useClass: PartnerRepository,
    },
  ],
  exports: [PartnerService, 'PartnerRepositoryInterface', TypeOrmModule],
})
export class PartnerModule {}