import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthPayloadDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guardAuth/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authPayload: AuthPayloadDto) {
    return this.authService.validateUser(authPayload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return { message: 'Profile accessible' };
  }
}
