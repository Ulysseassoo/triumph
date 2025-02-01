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
    PieceModule,
    MotoModule,
    NotificationModule,
    PartnerModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
