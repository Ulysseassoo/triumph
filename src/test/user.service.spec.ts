import { UserOrmEntity } from "../infrastructure/database/entities/user.orm-entity";
import { getTestDb } from "./setup";

describe("User Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(UserOrmEntity).clear();
  });

  it("should create a user", async () => {
    const repo = getTestDb().getRepository(UserOrmEntity);
    const user = repo.create({
      email: "john.doe@example.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    await repo.save(user);

    const savedUser = await repo.findOneBy({ email: "john.doe@example.com" });
    expect(savedUser).toHaveProperty("id");
  });

  it("should find a user by id", async () => {
    const repo = getTestDb().getRepository(UserOrmEntity);
    const user = repo.create({
      email: "john.doe@example.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    await repo.save(user);

    const savedUser = await repo.findOneBy({ email: "john.doe@example.com" });
    expect(savedUser).toBeDefined();
    expect(savedUser.id).toBe(user.id);
  });

  it("should update a user", async () => {
    const repo = getTestDb().getRepository(UserOrmEntity);
    const user = repo.create({
      email: "john.doe@example.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    await repo.save(user);

    const updateUserInfo = {
      ...user,
      name: "Smith",
    };

    const updatedUser = await repo.save(updateUserInfo);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe("Smith");
  });

  it("should delete a user", async () => {
    const repo = getTestDb().getRepository(UserOrmEntity);
    const user = repo.create({
      email: "john.doe@example.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    await repo.save(user);

    await repo.delete(user.id);

    const deletedUser = await repo.findOneBy({ email: "john.doe@example.com" });
    expect(deletedUser).toBeNull();
  });
});