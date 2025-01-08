import { UserOrmEntity } from './../entities/user.orm-entity';
import { User } from '../../../domain/entities/user.entity';

export class UserMapper {
  static toOrmEntity(user: User): UserOrmEntity {
    const ormUser = new UserOrmEntity();
    ormUser.id = user.id;
    ormUser.name = user.name;
    ormUser.email = user.email;
    ormUser.password = user.password;
    ormUser.passwordValidUntil = user.passwordValidUntil;
    ormUser.role = user.role;
    ormUser.isVerified = user.isVerified || false;
    return ormUser;
  }

  static toDomainEntity(ormUser: UserOrmEntity): User {
    return new User(
      ormUser.id,
      ormUser.name,
      ormUser.email,
      ormUser.password,
      ormUser.passwordValidUntil,
      ormUser.isVerified,
      ormUser.role,
    );
  }
}