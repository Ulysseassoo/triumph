import { NotificationOrmEntity } from "../infrastructure/database/entities/notification.orm-entity";
import { UserOrmEntity } from "../infrastructure/database/entities/user.orm-entity";
import { getTestDb } from "./setup";

describe("Notification Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(NotificationOrmEntity).clear();
  });

  it("should create a notification", async () => {
    const repo = getTestDb().getRepository(NotificationOrmEntity);
    const userRepo = getTestDb().getRepository(UserOrmEntity);
    const user = userRepo.create({
      email: "john.doe@example.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    const savedUser = await userRepo.save(user);

    const notification = repo.create({
      user: savedUser,
      date: new Date(),
      message: "Test notification",
      isRead: false,
    });

    await repo.save(notification);

    const savedNotification = await repo.findOneBy({ message: "Test notification" });
    expect(savedNotification).toHaveProperty("id");
  });

  it("should find a notification by id", async () => {
    const repo = getTestDb().getRepository(NotificationOrmEntity);
    const userRepo = getTestDb().getRepository(UserOrmEntity);
    const user = userRepo.create({
      email: "john.doe@bruuuuh.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    const savedUser = await userRepo.save(user);

    const notification = repo.create({
      user: savedUser,
      date: new Date(),
      message: "Test notification",
      isRead: false,
    });

    await repo.save(notification);

    const savedNotification = await repo.findOneBy({ message: "Test notification" });
    expect(savedNotification).toBeDefined();
    expect(savedNotification.id).toBe(notification.id);
  });

  it("should update a notification", async () => {
    const repo = getTestDb().getRepository(NotificationOrmEntity);
    const userRepo = getTestDb().getRepository(UserOrmEntity);
    const user = userRepo.create({
      email: "john.doe@zedezd.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    const savedUser = await userRepo.save(user);

    const notification = repo.create({
      user: savedUser,
      date: new Date(),
      message: "Test notification",
      isRead: false,
    });

    await repo.save(notification);

    const updateNotificationInfo = {
      ...notification,
      isRead: true,
    };

    const updatedNotification = await repo.save(updateNotificationInfo);
    expect(updatedNotification).toBeDefined();
    expect(updatedNotification.isRead).toBe(true);
  });

  it("should delete a notification", async () => {
    const repo = getTestDb().getRepository(NotificationOrmEntity);
    const userRepo = getTestDb().getRepository(UserOrmEntity);
    const user = userRepo.create({
      email: "john.doe@zdezdzedezdzd.com",
      name: "dandan",
      isVerified: true,
      password: "password",
    });

    const savedUser = await userRepo.save(user);

    const notification = repo.create({
      user: savedUser,
      date: new Date(),
      message: "Test notification",
      isRead: false,
    });

    await repo.save(notification);

    await repo.delete(notification.id);

    const deletedNotification = await repo.findOneBy({ message: "Test notification" });
    expect(deletedNotification).toBeNull();
  });
});