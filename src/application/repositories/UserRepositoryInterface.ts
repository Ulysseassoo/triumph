  import { User } from './../../domain/entities/user.entity';

  export interface UserRepositoryInterface {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByName(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByRole(role: string): Promise<User[]>;
    findAllFilters(criteria: object): Promise<User[]>;
    updatePatch(id: string, pieceData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
  }
