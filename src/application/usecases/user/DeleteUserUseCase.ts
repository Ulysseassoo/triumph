import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";

interface DeleteUserProps {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute({ id }: DeleteUserProps): Promise<void> {

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}
