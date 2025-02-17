import {  User } from "../../../domain/entities/user.entity";
import { v4 } from "uuid"
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";
interface Props {
  name:string,
  email:string,
  password:string,
  isVerified:boolean,
  role:string[],
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute({ name, email, password ,isVerified, role}: Props): Promise<User | null> {

    const user = new User(
        v4(),
        name,
        email,
        password,
        isVerified,
        role
    )


    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
