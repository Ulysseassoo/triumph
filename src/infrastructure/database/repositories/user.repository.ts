import { UserOrmEntity } from './../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from "../../../application/repositories/UserRepositoryInterface";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../../orm/typeorm/data-source";

export class TypeOrmUserRepository implements UserRepositoryInterface {
  private readonly repository: Repository<UserOrmEntity>;

  constructor() {
    this.repository = AppDataSource().getRepository(UserOrmEntity);
  }
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByName(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByRole(role: string): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findAllFilters(criteria: object): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  updatePatch(id: string, pieceData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, userData: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<User> {
    const ormUser = this.toOrmEntity(user);
    const savedOrmUser = await this.repository.save(ormUser);
    return this.toDomainEntity(savedOrmUser);
  }

  async findById(id: string): Promise<User | null> {
    const ormUser = await this.repository.findOneBy({ id });
    return ormUser ? this.toDomainEntity(ormUser) : null;
  }

  async findAll(): Promise<User[]> {
    const ormUsers = await this.repository.find();
    return ormUsers.map(this.toDomainEntity);
  }

  private toOrmEntity(user: User): UserOrmEntity {
    const ormUser = new UserOrmEntity();
    ormUser.id = user.id;
    ormUser.name = user.name;
    ormUser.email = user.email;
    ormUser.isVerified = !!user.isVerified;
    ormUser.password = user.password;
    ormUser.passwordValidUntil = user.passwordValidUntil;
    ormUser.role = user.role;
    return ormUser;
  }

  private toDomainEntity(user: UserOrmEntity): User {
    return new User(user.id, user.name, user.email, user.password, user.passwordValidUntil, user.isVerified, user.role);
  }
}
