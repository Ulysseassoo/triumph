import { AppDataSource } from './../../../orm/typeorm/data-source';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PieceModule } from './modules/piece.module';
import { NotificationModule } from './modules/notification.module';
import { MotoModule } from './modules/moto.module';
import { PartnerModule } from './modules/partner.module';
import { OrderModule } from './modules/order.module';
import { MaintenanceModule } from './modules/maintenance.module';
import { BreakdownModule } from './modules/breakdown.module';
import { CorrectiveActionModule } from './modules/corrective-action.module';
import { ReparationModule } from './modules/reparation.module';
import { WarrantyModule } from './modules/warranty.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          ...AppDataSource().options,
          autoLoadEntities: true,
        };
      },
    }),
    MaintenanceModule,
    PieceModule,
    MotoModule,
    NotificationModule,
    PartnerModule,
    OrderModule,
    BreakdownModule,
    CorrectiveActionModule,
    ReparationModule,
    WarrantyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
