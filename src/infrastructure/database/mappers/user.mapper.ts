import { User } from "../../../domain/entities/user.entity";
import { UserOrmEntity } from "../entities/user.orm-entity";

export class UserMapper {
  static toDomain(ormEntity: UserOrmEntity): User {
    return new User(ormEntity.id, ormEntity.name, ormEntity.email, ormEntity.password, ormEntity.passwordValidUntil, ormEntity.isVerified, ormEntity.role);
  }

  static toOrmEntity(domainEntity: User): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.email = domainEntity.email;
    ormEntity.password = domainEntity.password;
    ormEntity.passwordValidUntil = domainEntity.passwordValidUntil;
    ormEntity.isVerified = !!domainEntity.isVerified;
    ormEntity.role = domainEntity.role
    return ormEntity;
  }
}