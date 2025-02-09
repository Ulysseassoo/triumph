import { MotoStatus } from "../domain/entities/moto.entity";
import { AttemptOrmEntity } from "../infrastructure/database/entities/attempt.orm-entity";
import { DriverOrmEntity } from "../infrastructure/database/entities/driver.orm-entity";
import { MotoOrmEntity } from "../infrastructure/database/entities/moto.orm-entity";
import { PartnerOrmEntity } from "../infrastructure/database/entities/partner.orm-entity";
import { getTestDb } from "./setup";

describe("Attempt Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(AttemptOrmEntity).clear();
    await getTestDb().getRepository(DriverOrmEntity).clear();
    await getTestDb().getRepository(MotoOrmEntity).clear();
    await getTestDb().getRepository(PartnerOrmEntity).clear();
  });

  it("should create an attempt", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const attemptRepo = getTestDb().getRepository(AttemptOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const attempt = attemptRepo.create({
      startDate: new Date(),
      endDate: new Date(),
      startKilometer: 100,
      endKilometer: 200,
      status: "completed",
      driver: driver,
      moto: moto,
    });

    await attemptRepo.save(attempt);

    const savedAttempt = await attemptRepo.findOne({
      where: { status: "completed" },
      relations: ["driver", "moto"],
    });
    expect(savedAttempt).toHaveProperty("id");
    expect(savedAttempt.driver.id).toBe(driver.id);
    expect(savedAttempt.moto.id).toBe(moto.id);
  });

  it("should find an attempt by id", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const attemptRepo = getTestDb().getRepository(AttemptOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const attempt = attemptRepo.create({
      startDate: new Date(),
      endDate: new Date(),
      startKilometer: 100,
      endKilometer: 200,
      status: "completed",
      driver: driver,
      moto: moto,
    });

    await attemptRepo.save(attempt);

    const savedAttempt = await attemptRepo.findOne({
      where: { status: "completed" },
      relations: ["driver", "moto"],
    });
    expect(savedAttempt).toBeDefined();
    expect(savedAttempt.id).toBe(attempt.id);
    expect(savedAttempt.driver.id).toBe(driver.id);
    expect(savedAttempt.moto.id).toBe(moto.id);
  });

  it("should update an attempt", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const attemptRepo = getTestDb().getRepository(AttemptOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const attempt = attemptRepo.create({
      startDate: new Date(),
      endDate: new Date(),
      startKilometer: 100,
      endKilometer: 200,
      status: "completed",
      driver: driver,
      moto: moto,
    });

    await attemptRepo.save(attempt);

    const updateAttemptInfo = {
      ...attempt,
      status: "in-progress",
    };

    const updatedAttempt = await attemptRepo.save(updateAttemptInfo);
    expect(updatedAttempt).toBeDefined();
    expect(updatedAttempt.status).toBe("in-progress");
  });

  it("should delete an attempt", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const attemptRepo = getTestDb().getRepository(AttemptOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const attempt = attemptRepo.create({
      startDate: new Date(),
      endDate: new Date(),
      startKilometer: 100,
      endKilometer: 200,
      status: "completed",
      driver: driver,
      moto: moto,
    });

    await attemptRepo.save(attempt);

    await attemptRepo.delete(attempt.id);

    const deletedAttempt = await attemptRepo.findOneBy({ status: "completed" });
    expect(deletedAttempt).toBeNull();
  });
});