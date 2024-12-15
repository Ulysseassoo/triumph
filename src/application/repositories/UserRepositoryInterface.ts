import { User } from "../../domain/entities/user.entity";

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}