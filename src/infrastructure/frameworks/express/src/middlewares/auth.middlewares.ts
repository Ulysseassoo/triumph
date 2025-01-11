import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TypeOrmUserRepository } from 'src/repositories/user.repository';

interface IUser {
  id: string;
  isVerified: boolean;
  role?: string[];
}

interface AuthRequest extends Request {
  user?: IUser;
}

type UserRole = 'staff' | 'client' | 'user';


class AuthenticationError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

const checkAuth = (secret: Uint8Array | string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new AuthenticationError('No authorization header');
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new AuthenticationError('Invalid authorization format');
      }
      const secretString = secret instanceof Uint8Array ? 
        Buffer.from(secret).toString('utf-8') : 
        secret;

      try {
        const decoded = jwt.verify(token, secretString) as JwtPayload;
        if (!decoded.id) {
          throw new AuthenticationError('Invalid token payload');
        }

        const userRepo = new TypeOrmUserRepository();
        const user = await userRepo.findById(decoded.id); 

        if (!user) {
          throw new AuthenticationError('User not found');
        }

        res.locals.token = token;
        (req as AuthRequest).user = {
          id: user.id,
          isVerified: user.isVerified || false,
          role: user.role || []
        };

        next();
      } catch (jwtError: any) {
        if (jwtError.name === 'JsonWebTokenError') {
          throw new AuthenticationError('Invalid token format');
        } else if (jwtError.name === 'TokenExpiredError') {
          throw new AuthenticationError('Token has expired');
        }
        throw jwtError;
      }
    } catch (error) {
      if (error instanceof AuthenticationError) {
        res.status(error.statusCode).json({
          error: error.name,
          message: error.message
        });
      } else {
        res.status(500).json({
          error: 'InternalServerError',
          message: 'An internal server error occurred'
        });
      }
    }
  };
};


const checkRole = (allowedRoles: UserRole[] = ['staff']) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthRequest;
      if (!authReq.user) {
        throw new AuthenticationError('User not authenticated', 403);
      }

      // if (!authReq.user.isVerified) {
      //   throw new AuthenticationError('User not verified', 403);
      // }

      const userRoles = authReq.user.role || [];
      const hasAllowedRole = allowedRoles.some(role => userRoles.includes(role));

      if (!hasAllowedRole) {
        throw new AuthenticationError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      if (error instanceof AuthenticationError) {
        res.status(error.statusCode).json({
          error: error.name,
          message: error.message
        });
      } else {
        res.status(500).json({
          error: 'InternalServerError',
          message: 'An internal server error occurred'
        });
      }
    }
  };
};

export {
  checkAuth,
  checkRole,
  UserRole,
  AuthRequest,
  IUser,
  AuthenticationError
};