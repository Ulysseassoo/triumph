import { UserRepositoryInterface } from "../../application/repositories/UserRepositoryInterface";
import { ListUserUseCase } from "../../application/usecases/user/ListUserUseCase";
import { User } from "../../domain/entities/user.entity";

describe("ListUserUseCase", () => {
  let listUserUseCase: ListUserUseCase;
  let userRepository: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepository = {
      findAllFilters: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      updatePatch: jest.fn(),
      getUserValidate: jest.fn(),
    };

    listUserUseCase = new ListUserUseCase(userRepository);
  });

  it("should list users with filters and pagination", async () => {
    const users: User[] = [
      new User("user-id-1", "User One", "user1@example.com", "password", true, ["user"]),
      new User("user-id-2", "User Two", "user2@example.com", "password", true, ["user"]),
    ];

    userRepository.findAllFilters.mockResolvedValue(users);

    const result = await listUserUseCase.execute(
      { name: "User" },
      { page: 1, limit: 10 }
    );

    expect(result.data).toEqual(users);
    expect(result.total).toBe(users.length);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(userRepository.findAllFilters).toHaveBeenCalledWith({
      filters: { name: "User" },
      pagination: { offset: 0, limit: 10 },
    });
  });
});