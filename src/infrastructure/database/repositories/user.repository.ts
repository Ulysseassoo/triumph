import { Repository } from 'typeorm';
import { UserOrmEntity } from './../entities/user.orm-entity';
import { UserRepositoryInterface } from "@application/repositories/UserRepositoryInterface";
import { User } from "@domain/entities/user.entity";
import { AppDataSource } from "@infrastructure/orm/typeorm/data-source";
import argon2 from '@node-rs/argon2';
import { authConfig } from '@infrastructure/orm/config/auth.config';

export class TypeOrmUserRepository implements UserRepositoryInterface {
    private readonly repository: Repository<UserOrmEntity>;

    constructor() {
        this.repository = AppDataSource().getRepository(UserOrmEntity);
    }

    async create(user: User): Promise<User> {
        try {
            const hashedPassword = await argon2.hash(user.password, authConfig.hashOptions);
            const userToSave = this.toOrmEntity(user);
            userToSave.password = hashedPassword;

            const savedUser = await this.repository.save(userToSave);
            return this.toDomainEntity(savedUser);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.repository.findOneBy({ email });
            return user ? this.toDomainEntity(user) : null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error(`Failed to find user by email: ${error.message}`);
        }
    }

    async findByName(name: string): Promise<User | null> {
        try {
            const user = await this.repository.findOneBy({ name });
            return user ? this.toDomainEntity(user) : null;
        } catch (error) {
            console.error('Error finding user by name:', error);
            throw new Error(`Failed to find user by name: ${error.message}`);
        }
    }

    async findByRole(role: string): Promise<User[]> {
        try {
            const users = await this.repository.find({ 
                where: { role: role }
            });
            return users.map(this.toDomainEntity);
        } catch (error) {
            console.error('Error finding users by role:', error);
            throw new Error(`Failed to find users by role: ${error.message}`);
        }
    }

    async findAllFilters(criteria: {
        filters?: {
            name?: string;
            email?: string;
            role?: string;
        };
        pagination?: {
            offset?: number;
            limit?: number;
        };
    }): Promise<User[]> {
        try {
            const { filters = {}, pagination = {} } = criteria;
            const { name, email, role } = filters;
            const { offset = 0, limit = 10 } = pagination;

            let queryBuilder = this.repository.createQueryBuilder('user');

            if (name) {
                queryBuilder = queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });
            }

            if (email) {
                queryBuilder = queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
            }

            if (role) {
                queryBuilder = queryBuilder.andWhere('user.role = :role', { role });
            }

            const users = await queryBuilder
                .skip(offset)
                .take(limit)
                .getMany();

            return users.map(this.toDomainEntity);
        } catch (error) {
            console.error('Error finding filtered users:', error);
            throw new Error(`Failed to find filtered users: ${error.message}`);
        }
    }

    async updatePatch(id: string, userData: Partial<User>): Promise<User> {
        try {
            const existingUser = await this.repository.findOneBy({ id });
            if (!existingUser) {
                throw new Error(`User with ID ${id} not found`);
            }

            let hashedPassword: string | undefined;
            if (userData.password) {
                hashedPassword = await argon2.hash(userData.password, authConfig.hashOptions);
            }

            const updateData: Partial<UserOrmEntity> = {
                ...userData,
                ...(hashedPassword && { password: hashedPassword }),
                ...(userData.passwordValidUntil && { 
                    passwordValidUntil: new Date(userData.passwordValidUntil) 
                }),
                role: userData.role ? userData.role.map(role => role.toString()) : undefined,
            };

            await this.repository.update(id, updateData);

            const updatedUser = await this.repository.findOneBy({ id });
            if (!updatedUser) {
                throw new Error(`Failed to update user with ID ${id}`);
            }

            return this.toDomainEntity(updatedUser);
        } catch (error) {
            console.error('Error patching user:', error);
            throw new Error(`Failed to patch user: ${error.message}`);
        }
    }

    async update(id: string, userData: Partial<User>): Promise<User | null> {
        try {
            let hashedPassword: string | undefined;
            if (userData.password) {
                hashedPassword = await argon2.hash(userData.password, authConfig.hashOptions);
            }

            const updateData: Partial<UserOrmEntity> = {
                ...userData,
                ...(hashedPassword && { password: hashedPassword }),
                ...(userData.passwordValidUntil && { 
                    passwordValidUntil: new Date(userData.passwordValidUntil) 
                }),
                role: userData.role ? userData.role.map(role => role.toString()) : undefined,
            };

            await this.repository.update(id, updateData);

            const updatedUser = await this.repository.findOneBy({ id });
            return updatedUser ? this.toDomainEntity(updatedUser) : null;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.repository.delete(id);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error(`Failed to delete user: ${error.message}`);
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

    async getUserValidate(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.findByEmail(email);
            if (!user) {
                return null;
            }

            const isPasswordValid = await argon2.verify(user.password, password);
            return isPasswordValid ? user : null;
        } catch (error) {
            console.error('User validation error:', error);
            throw new Error(`User validation error: ${error.message}`);
        }
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