import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MigrationService } from '../config/migration.config';
import DataSource from '../config/typeorm.config';
import { mongoDataSource } from '../config/mongoOrmConfig';
import { PieceModule } from './piece.module';
import { OrderModule } from './order.module';

const mysqlConfig: TypeOrmModuleOptions = {
  ...DataSource,
  name: 'default',
  autoLoadEntities: true,
};

const mongoConfig: TypeOrmModule = {
  ...mongoDataSource.options,
  name: 'mongodb',
  autoLoadEntities: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(mysqlConfig),
    TypeOrmModule.forRoot(mongoConfig),
    OrderModule,
    PieceModule,
  ],
  providers: [MigrationService],
})
export class AppModule {}