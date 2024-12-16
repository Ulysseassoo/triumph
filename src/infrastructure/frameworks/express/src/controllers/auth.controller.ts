import { Request, Response } from 'express';
// import { TypeOrmUserRepository } from '@infrastructure/database/repositories/user.repository';
// import { User } from '@domain/entities/user.entity';

import { authConfig } from '@infrastructure/orm/config/auth.config';
import jwt from 'jsonwebtoken';
export class AuthController {
  // async register(req: Request, res: Response) {
  //   try {
  //     const { name, email, password } = req.body;
  //     const isEmailUnique = await TypeOrmUserRepository.isEmailUnique(email);
  //     if (!isEmailUnique) {
  //       return res.status(400).json({ error: 'Email already exists' });
  //     }
  //     const user = new User(
  //       undefined, 
  //       name, 
  //       email, 
  //       password
  //     );

  //     const savedUser = await TypeOrmUserRepository.create(user);

  //     res.status(201).json({ 
  //       user: { 
  //         id: savedUser.id, 
  //         name: savedUser.name, 
  //         email: savedUser.email,
  //         password: savedUser.password
  //       },

  //     });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }

  // async login(req: Request, res: Response) {
  //   try {
  //     const { email, password } = req.body;

  //     const user = await TypeOrmUserRepository.getUserValidate(email, password);
  //     if (!user) {
  //       return res.status(401).json({ error: 'Invalid credentials' });
  //     }

  //     const accessToken = this.generateAccessToken(user);
  //     const refreshToken = this.generateRefreshToken(user);
  //     res.json({ 
  //       accessToken,
  //       refreshToken
  //     });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }

  // async refreshToken(req: Request, res: Response) {
  //   try {
  //     const { refreshToken } = req.body;
  //     const decoded = jwt.verify(refreshToken, authConfig.refreshTokenSecret);
  //     const user = await TypeOrmUserRepository.findById(decoded.id);

  //     if (!user) {
  //       return res.status(401).json({ error: 'Invalid token' });
  //     }
  //     const newAccessToken = this.generateAccessToken(user);

  //     res.json({ accessToken: newAccessToken });
  //   } catch (error) {
  //     res.status(401).json({ error: 'Invalid refresh token' });
  //   }
  // }
  // generateAccessToken(user: User): string {
  //   return jwt.sign(
  //     { id: user.id, email: user.email },
  //     authConfig.accessTokenSecret,
  //     { expiresIn: '15m' }
  //   );
  // }

  // generateRefreshToken(user: User): string {
  //   return jwt.sign(
  //     { id: user.id, email: user.email },
  //     authConfig.refreshTokenSecret,
  //     { expiresIn: '7d' }
  //   );
  // }
}

export const authController = new AuthController();