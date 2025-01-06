import { Request } from 'express';
import { TypeOrmUserRepository } from '../repositories/user.repository';
import { User } from '../../../../../domain/entities/user.entity';
import { authConfig } from '../config/auth.config';
import jwt, { Secret } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

interface AuthResponse {
  user?: Partial<User>;
  accessToken?: string;
  refreshToken?: string;
}

export class AuthController {
  private userRepository: TypeOrmUserRepository;
  private readonly accessTokenSecret: Secret;
  private readonly refreshTokenSecret: Secret;

  constructor() {
    this.userRepository = new TypeOrmUserRepository();
    this.accessTokenSecret = authConfig.accessTokenSecret as Secret;
    this.refreshTokenSecret = authConfig.refreshTokenSecret as Secret;
  }

  async register(req: Request): Promise<AuthResponse> {
    const { name, email, password } = req.body;
    
    const isEmailUnique = await this.userRepository.isEmailUnique(email);
    if (!isEmailUnique) {
      throw new Error('Email already exists');
    }

    const user = new User(
      uuidv4(),
      name,
      email,
      password
    );

    const savedUser = await this.userRepository.create(user);
    
    return {
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        password: savedUser.password
      }
    };
  }

  async login(req: Request): Promise<AuthResponse> {
    const { email, password } = req.body;

    const user = await this.userRepository.getUserValidate(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken
    };
  }

  async refreshToken(req: Request): Promise<AuthResponse> {
    const { refreshToken } = req.body;
    
    const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as jwt.JwtPayload;
    const user = await this.userRepository.findById(decoded.id);

    if (!user) {
      throw new Error('Invalid token');
    }

    const newAccessToken = this.generateAccessToken(user);

    return {
      accessToken: newAccessToken
    };
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.accessTokenSecret,
      { expiresIn: '15m' }
    );
  }

  private generateRefreshToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.refreshTokenSecret,
      { expiresIn: '7d' }
    );
  }
}