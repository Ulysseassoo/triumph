import { UserOrmEntity } from './../../../../database/entities/user.orm-entity';
import {Module} from '@nestjs/common';
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../strategiesAuth/local.stategies";
import { JwtStrategy } from '../strategiesAuth/jwt.strategies';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('1h') || '1d'
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UserRepository,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository
    }
  ],
  exports: [ 'UserRepositoryInterface', TypeOrmModule, JwtModule]
})
export class AuthModule {}