import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";
import { User } from './../../../domain/entities/user.entity';

export class AddUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(userData: Partial<User>): Promise<User> {
    if (!userData.email || !userData.name || !userData.password ||  !userData.passwordValidUntil || !userData.isVerified|| !userData.role) {
      throw new Error("Missing required user fields");
    }

    const user = new User(
      userData.id ?? crypto.randomUUID(),
      userData.email,
      userData.name,
      userData.password,
      userData.passwordValidUntil,
      userData.isVerified,
      userData.role
    );

    return await this.userRepository.create(user);
  }
}
