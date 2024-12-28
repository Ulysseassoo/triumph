import { User } from "../../../domain/entities/user.entity";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";

interface UpdateUserProps {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  passwordValidUntil?: Date;
  isVerified?: boolean;
  role?: string[];
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute({ id, ...updateData }: UpdateUserProps): Promise<User | null> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the user
    const updatedUser = await this.userRepository.update(id, updateData);
    return updatedUser;
  }
}