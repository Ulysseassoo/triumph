import { MaintenanceType } from "../domain/entities/maintenance.entity";
import { MotoStatus } from "../domain/entities/moto.entity";
import { MaintenanceOrmEntity } from "../infrastructure/database/entities/maintenance.orm-entity";
import { MotoOrmEntity } from "../infrastructure/database/entities/moto.orm-entity";
import { PartnerOrmEntity } from "../infrastructure/database/entities/partner.orm-entity";
import { getTestDb } from "./setup";

describe("Maintenance Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(MaintenanceOrmEntity).clear();
    await getTestDb().getRepository(MotoOrmEntity).clear();
    await getTestDb().getRepository(PartnerOrmEntity).clear();
  });

  it("should create a maintenance", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const maintenanceRepo = getTestDb().getRepository(MaintenanceOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const maintenance = maintenanceRepo.create({
      motoId: moto.id,
      maintenanceType: MaintenanceType.PREVENTIF,
      plannedDate: new Date(),
      mileage: 10000,
      maintenanceInterval: { mileage: 10000, timeInMonths: 12 },
      recommandations: "Check oil",
      cost: 100,
    });

    await maintenanceRepo.save(maintenance);

    const savedMaintenance = await maintenanceRepo.findOneBy({ maintenanceType: MaintenanceType.PREVENTIF });
    expect(savedMaintenance).toHaveProperty("id");
    expect(savedMaintenance.motoId).toBe(moto.id);
  });

  it("should find a maintenance by id", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const maintenanceRepo = getTestDb().getRepository(MaintenanceOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const maintenance = maintenanceRepo.create({
      motoId: moto.id,
      maintenanceType: MaintenanceType.PREVENTIF,
      plannedDate: new Date(),
      mileage: 10000,
      maintenanceInterval: { mileage: 10000, timeInMonths: 12 },
      recommandations: "Check oil",
      cost: 100,
    });

    await maintenanceRepo.save(maintenance);

    const savedMaintenance = await maintenanceRepo.findOneBy({ maintenanceType: MaintenanceType.PREVENTIF });
    expect(savedMaintenance).toBeDefined();
    expect(savedMaintenance.id).toBe(maintenance.id);
    expect(savedMaintenance.motoId).toBe(moto.id);
  });

  it("should update a maintenance", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const maintenanceRepo = getTestDb().getRepository(MaintenanceOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const maintenance = maintenanceRepo.create({
      motoId: moto.id,
      maintenanceType: MaintenanceType.PREVENTIF,
      plannedDate: new Date(),
      mileage: 10000,
      maintenanceInterval: { mileage: 10000, timeInMonths: 12 },
      recommandations: "Check oil",
      cost: 100,
    });

    await maintenanceRepo.save(maintenance);

    const updateMaintenanceInfo = {
      ...maintenance,
      maintenanceType: MaintenanceType.CURATIF,
    };

    const updatedMaintenance = await maintenanceRepo.save(updateMaintenanceInfo);
    expect(updatedMaintenance).toBeDefined();
    expect(updatedMaintenance.maintenanceType).toBe(MaintenanceType.CURATIF);
  });

  it("should delete a maintenance", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);
    const maintenanceRepo = getTestDb().getRepository(MaintenanceOrmEntity);

    const partner = partnerRepo.create({
      nom: "Partner A",
      contactInfo: "123 Main St",
    });

    await partnerRepo.save(partner);

    const moto = motoRepo.create({
      model: "Model X",
      currentMileage: 5000,
      price: 10000,
      status: MotoStatus.InService,
      partner: partner,
    });

    await motoRepo.save(moto);

    const maintenance = maintenanceRepo.create({
      motoId: moto.id,
      maintenanceType: MaintenanceType.PREVENTIF,
      plannedDate: new Date(),
      mileage: 10000,
      maintenanceInterval: { mileage: 10000, timeInMonths: 12 },
      recommandations: "Check oil",
      cost: 100,
    });

    await maintenanceRepo.save(maintenance);

    await maintenanceRepo.delete(maintenance.id);

    const deletedMaintenance = await maintenanceRepo.findOneBy({ maintenanceType: MaintenanceType.PREVENTIF });
    expect(deletedMaintenance).toBeNull();
  });
});