import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

interface AuthRequest extends Request {
  user?: jwt.JwtPayload;
}

export const verifyAuthentication = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, authConfig.accessTokenSecret as Secret) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};