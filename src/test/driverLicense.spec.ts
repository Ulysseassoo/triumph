import { DriverOrmEntity } from "../infrastructure/database/entities/driver.orm-entity";
import { DriverLicenseOrmEntity } from "../infrastructure/database/entities/driverLicense.orm-entity";
import { getTestDb } from "./setup";

describe("DriverLicense Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(DriverLicenseOrmEntity).clear();
  });

  it("should create a driver license", async () => {
    const repo = getTestDb().getRepository(DriverLicenseOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    const savedDriver = await driverRepo.save(driver);

    const driverLicense = repo.create({
      driver: savedDriver,
      licenseNumber: "123456789",
      expiryDate: new Date("2030-01-01"),
      category: "B",
      obtainDate: new Date("2010-01-01"),
      country: "France",
      status: "active",
    });

    await repo.save(driverLicense);

    const savedDriverLicense = await repo.findOneBy({
      licenseNumber: "123456789",
    });
    expect(savedDriverLicense).toHaveProperty("id");
  });

  it("should find a driver license by id", async () => {
    const repo = getTestDb().getRepository(DriverLicenseOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    const savedDriver = await driverRepo.save(driver);

    const driverLicense = repo.create({
      driver: savedDriver,
      licenseNumber: "123456789",
      expiryDate: new Date("2030-01-01"),
      category: "B",
      obtainDate: new Date("2010-01-01"),
      country: "France",
      status: "active",
    });

    await repo.save(driverLicense);

    const savedDriverLicense = await repo.findOneBy({
      licenseNumber: "123456789",
    });
    expect(savedDriverLicense).toBeDefined();
    expect(savedDriverLicense.id).toBe(driverLicense.id);
  });

  it("should update a driver license", async () => {
    const repo = getTestDb().getRepository(DriverLicenseOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    const savedDriver = await driverRepo.save(driver);

    const driverLicense = repo.create({
      driver: savedDriver,
      licenseNumber: "123456789",
      expiryDate: new Date("2030-01-01"),
      category: "B",
      obtainDate: new Date("2010-01-01"),
      country: "France",
      status: "active",
    });

    await repo.save(driverLicense);

    const updateDriverLicenseInfo = {
      ...driverLicense,
      licenseNumber: "987654321",
    };

    const updatedDriverLicense = await repo.save(updateDriverLicenseInfo);
    expect(updatedDriverLicense).toBeDefined();
    expect(updatedDriverLicense.licenseNumber).toBe("987654321");
  });

  it("should delete a driver license", async () => {
    const repo = getTestDb().getRepository(DriverLicenseOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    const savedDriver = await driverRepo.save(driver);

    const driverLicense = repo.create({
      driver: savedDriver,
      licenseNumber: "123456789",
      expiryDate: new Date("2030-01-01"),
      category: "B",
      obtainDate: new Date("2010-01-01"),
      country: "France",
      status: "active",
    });

    await repo.save(driverLicense);

    await repo.delete(driverLicense.id);

    const deletedDriverLicense = await repo.findOneBy({
      licenseNumber: "123456789",
    });
    expect(deletedDriverLicense).toBeNull();
  });
});
