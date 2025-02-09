import { MotoStatus } from "../domain/entities/moto.entity";
import { CrashOrmEntity } from "../infrastructure/database/entities/crash.orm-entity";
import { DriverOrmEntity } from "../infrastructure/database/entities/driver.orm-entity";
import { MotoOrmEntity } from "../infrastructure/database/entities/moto.orm-entity";
import { PartnerOrmEntity } from "../infrastructure/database/entities/partner.orm-entity";
import { getTestDb } from "./setup";

describe("Crash Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(CrashOrmEntity).clear();
    await getTestDb().getRepository(DriverOrmEntity).clear();
    await getTestDb().getRepository(MotoOrmEntity).clear();
  });

  it("should create a crash", async () => {
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const crashRepo = getTestDb().getRepository(CrashOrmEntity);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    const savedPartner = await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: savedPartner,
    });

    await motoRepo.save(moto);

    const crash = crashRepo.create({
      type: "Collision",
      date: new Date(),
      description: "Accident with another vehicle",
      location: "Paris",
      responsability: "Shared",
      consequence: "Minor damage",
      status: "Resolved",
      driver: driver,
      moto: moto,
    });

    await crashRepo.save(crash);

    const savedCrash = await crashRepo.findOne({
      where: { type: "Collision" },
      relations: ["driver", "moto"],
    });
    expect(savedCrash).toHaveProperty("id");
    expect(savedCrash.driver.id).toBe(driver.id);
    expect(savedCrash.moto.id).toBe(moto.id);
  });

  it("should find a crash by id", async () => {
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const crashRepo = getTestDb().getRepository(CrashOrmEntity);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    const savedPartner = await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: savedPartner,
    });

    await motoRepo.save(moto);

    const crash = crashRepo.create({
      type: "Collision",
      date: new Date(),
      description: "Accident with another vehicle",
      location: "Paris",
      responsability: "Shared",
      consequence: "Minor damage",
      status: "Resolved",
      driver: driver,
      moto: moto,
    });

    await crashRepo.save(crash);

    const savedCrash = await crashRepo.findOne({
      where: { type: "Collision" },
      relations: ["driver", "moto"],
    });
    expect(savedCrash).toBeDefined();
    expect(savedCrash.id).toBe(crash.id);
    expect(savedCrash.driver.id).toBe(driver.id);
    expect(savedCrash.moto.id).toBe(moto.id);
  });

  it("should update a crash", async () => {
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const crashRepo = getTestDb().getRepository(CrashOrmEntity);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    const savedPartner = await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: savedPartner,
    });

    await motoRepo.save(moto);

    const crash = crashRepo.create({
      type: "Collision",
      date: new Date(),
      description: "Accident with another vehicle",
      location: "Paris",
      responsability: "Shared",
      consequence: "Minor damage",
      status: "Resolved",
      driver: driver,
      moto: moto,
    });

    await crashRepo.save(crash);

    const updateCrashInfo = {
      ...crash,
      status: "In Progress",
    };

    const updatedCrash = await crashRepo.save(updateCrashInfo);
    expect(updatedCrash).toBeDefined();
    expect(updatedCrash.status).toBe("In Progress");
  });

  it("should delete a crash", async () => {
    const driverRepo = getTestDb().getRepository(DriverOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const crashRepo = getTestDb().getRepository(CrashOrmEntity);

    const driver = driverRepo.create({
      firstname: "Jean",
      lastname: "Dupont",
      birthdate: new Date("1990-05-15"),
      addresse: "Paris",
    });

    await driverRepo.save(driver);
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    const savedPartner = await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: savedPartner,
    });

    await motoRepo.save(moto);

    const crash = crashRepo.create({
      type: "Collision",
      date: new Date(),
      description: "Accident with another vehicle",
      location: "Paris",
      responsability: "Shared",
      consequence: "Minor damage",
      status: "Resolved",
      driver: driver,
      moto: moto,
    });

    await crashRepo.save(crash);

    await crashRepo.delete(crash.id);

    const deletedCrash = await crashRepo.findOneBy({ type: "Collision" });
    expect(deletedCrash).toBeNull();
  });
});