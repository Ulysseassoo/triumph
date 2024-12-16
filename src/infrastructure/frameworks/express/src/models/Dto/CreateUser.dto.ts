export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    passwordValidUntil: Date;
    isVerified: boolean;
    role: string[];
  }
  
  export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    passwordValidUntil?: Date;
    isVerified?: boolean;
    role?: string[];
  }