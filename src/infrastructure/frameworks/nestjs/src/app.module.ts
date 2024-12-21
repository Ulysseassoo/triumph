import { AppDataSource } from './../../../orm/typeorm/data-source';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PieceModule } from './modules/piece.module';


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
    PieceModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
