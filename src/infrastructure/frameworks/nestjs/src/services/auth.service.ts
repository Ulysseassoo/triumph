/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../../application/repositories/UserRepositoryInterface';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from '../dtos/auth.dto'
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const { password: userPassword, ...userWithoutPassword } = user;
    return {
      access_token: this.jwtService.sign(userWithoutPassword),
    };
  }
}
