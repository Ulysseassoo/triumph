  import { User } from './../../domain/entities/user.entity';

  export interface UserRepositoryInterface {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAllFilters(criteria: object): Promise<User[]>;
    findAll(): Promise<User[]>;
    updatePatch(id: string, pieceData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    getUserValidate(email: string, password: string): Promise<User | null> 
  }
