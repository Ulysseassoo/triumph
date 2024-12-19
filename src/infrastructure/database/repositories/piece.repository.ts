import { UserOrmEntity } from '../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from "../../../application/repositories/UserRepositoryInterface";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../../orm/typeorm/data-source";

export class TypeOrmPieceRepository implements UserRepositoryInterface {
  private readonly repository: Repository<UserOrmEntity>;

  constructor() {
    this.repository = AppDataSource().getRepository(UserOrmEntity);
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
