import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guardAuth/jwt.guard';
import { NotificationService } from 'src/services/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getNotificationsByUserId(@Param('userId') userId: string) {
    try {
      const notifications = await this.notificationService.findByUserId(userId);
      return notifications;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch notifications',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
