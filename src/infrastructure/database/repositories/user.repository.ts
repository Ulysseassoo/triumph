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

  async create(user: User): Promise<User> {
    const ormUser = this.toOrmEntity(user);
    const createdUser = await this.repository.save(ormUser);
    return this.toDomainEntity(createdUser);
  }

  async findByEmail(email: string): Promise<User> {
    const ormUser = await this.repository.findOneBy({ email });
    if (!ormUser) {
      throw new Error(`User with email ${email} not found`);
    }
    return this.toDomainEntity(ormUser);
  }

  async findByName(name: string): Promise<User> {
    const ormUser = await this.repository.findOneBy({ name });
    if (!ormUser) {
      throw new Error(`User with name ${name} not found`);
    }
    return this.toDomainEntity(ormUser);
  }

  async findByRole(role: string): Promise<User[]> {
    const ormUsers = await this.repository.findBy({ role });
    return ormUsers.map(this.toDomainEntity);
  }

  async findAllFilters(criteria: object): Promise<User[]> {
    const ormUsers = await this.repository.find({
      where: criteria
    });
    return ormUsers.map(this.toDomainEntity);
  }

  async updatePatch(id: string, pieceData: Partial<User>): Promise<User> {
    const existingUser = await this.repository.findOneBy({ id });
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    // Only update the fields that are present in pieceData
    Object.assign(existingUser, this.toOrmEntity(pieceData as User));
    
    const updatedUser = await this.repository.save(existingUser);
    return this.toDomainEntity(updatedUser);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const existingUser = await this.repository.findOneBy({ id });
    if (!existingUser) {
      throw new Error(`User with id ${id} not found`);
    }

    // Update all fields
    const updatedOrmUser = this.toOrmEntity({ ...this.toDomainEntity(existingUser), ...userData });
    const savedUser = await this.repository.save(updatedOrmUser);
    return this.toDomainEntity(savedUser);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
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
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.passwordValidUntil,
      user.isVerified,
      user.role
    );
  }
}