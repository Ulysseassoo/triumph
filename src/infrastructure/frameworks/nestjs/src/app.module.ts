import { AppDataSource } from './../../../orm/typeorm/data-source';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceModule } from './modules/maintenance.module';
import { PieceModule } from './modules/piece.module';
import { NotificationModule } from './modules/notification.module';
import { MotoModule } from './modules/moto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        console.log('AppDataSource().options', AppDataSource().options);
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
