import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authorization header');
    }

    try {
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      if (!accessTokenSecret) {
        throw new Error('ACCESS_TOKEN_SECRET is not configured');
      }

      const decoded = jwt.verify(token, accessTokenSecret) as jwt.JwtPayload & {
        id: string;
        email: string;
        role?: string[];
        isVerified?: boolean;
      };

      console.log('Decoded token:', decoded);

      
      if (!decoded.isVerified) {
        throw new UnauthorizedException('Email not verified');
      }

      const userRoles = Array.isArray(decoded.role) ? decoded.role : 
                       typeof decoded.role === 'string' ? [decoded.role] : 
                       [];

      console.log('User roles:', userRoles);

      request.user = {
        id: decoded.id,
        email: decoded.email,
        role: userRoles,
        isVerified: decoded.isVerified
      };
      
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log('Required roles:', requiredRoles);

      if (requiredRoles && requiredRoles.length > 0) {
        const hasRole = this.matchRoles(requiredRoles, userRoles);
        console.log('Has required role:', hasRole);

        if (!hasRole) {
          throw new UnauthorizedException(
            `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}, User roles: ${userRoles.join(', ')}`
          );
        }
      }

      return true;
    } catch (error) {
      console.error('Auth error:', error);

      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }
      throw error;
    }
  }

  private extractJwtFromHeader(request: any): string | undefined {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    return bearer === 'Bearer' ? token : undefined;
  }

  private matchRoles(requiredRoles: string[], userRoles: string[] = []): boolean {
    return requiredRoles.some(role => 
      userRoles.some(userRole => 
        userRole.toLowerCase() === role.toLowerCase()
      )
    );
  }
}