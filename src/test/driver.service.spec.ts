import { DriverOrmEntity } from "../infrastructure/database/entities/driver.orm-entity";
import { getTestDb } from "./setup";

describe("Driver Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(DriverOrmEntity).clear();
  });

  it("should create a driver", async () => {
    const repo = getTestDb().getRepository(DriverOrmEntity);
    const driver = repo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await repo.save(driver);

    const savedDriver = await repo.findOneBy({ firstname: "Jean" });
    expect(savedDriver).toHaveProperty("id");
  });

  it("should find a driver by id", async () => {
    const repo = getTestDb().getRepository(DriverOrmEntity);
    const driver = repo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await repo.save(driver);

    const savedDriver = await repo.findOneBy({ firstname: "Jean" });
    expect(savedDriver).toBeDefined();
    expect(savedDriver.id).toBe(driver.id);
  });

  it("should update a driver", async () => {
    const repo = getTestDb().getRepository(DriverOrmEntity);
    const driver = repo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await repo.save(driver);

    const updateDriverInfo = {
      ...driver,
      lastname: "Durand",
    }

    const updatedDriver = await repo.save(updateDriverInfo);
    expect(updatedDriver).toBeDefined();
    expect(updatedDriver.lastname).toBe("Durand");
  });

  it("should delete a driver", async () => {
    const repo = getTestDb().getRepository(DriverOrmEntity);
    const driver = repo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await repo.save(driver);

    await repo.delete(driver.id);

    const deletedDriver = await repo.findOneBy({ firstname: "Jean" });
    expect(deletedDriver).toBeNull();
  });

});
