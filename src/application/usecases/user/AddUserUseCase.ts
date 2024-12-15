import { UserRepositoryInterface } from "../../repositories/UserRepository";
import { UserDomain } from './../../../domain/entities/UserDomain';

export class AddUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(userData: Partial<UserDomain>): Promise<UserDomain> {
    if (!userData.email || !userData.name || !userData.password ||  !userData.passwordValidUntil || !userData.isVerified|| !userData.role) {
      throw new Error("Missing required user fields");
    }

    const user = new UserDomain(
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
