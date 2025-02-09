import { MotoStatus } from "../domain/entities/moto.entity";
import { MotoOrmEntity } from "../infrastructure/database/entities/moto.orm-entity";
import { PartnerOrmEntity } from "../infrastructure/database/entities/partner.orm-entity";
import { getTestDb } from "./setup";

describe("Moto Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(MotoOrmEntity).clear();
    await getTestDb().getRepository(PartnerOrmEntity).clear();
  });

  it("should create a moto", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);

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

    const savedMoto = await motoRepo.findOneBy({ model: "Model X" });
    expect(savedMoto).toHaveProperty("id");
    expect(savedMoto.partner.id).toBe(partner.id);
  });

  it("should find a moto by id", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);

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

    const savedMoto = await motoRepo.findOneBy({ model: "Model X" });
    expect(savedMoto).toBeDefined();
    expect(savedMoto.id).toBe(moto.id);
    expect(savedMoto.partner.id).toBe(partner.id);
  });

  it("should update a moto", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);

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

    const updateMotoInfo = {
      ...moto,
      model: "Model Y",
    };

    const updatedMoto = await motoRepo.save(updateMotoInfo);
    expect(updatedMoto).toBeDefined();
    expect(updatedMoto.model).toBe("Model Y");
  });

  it("should delete a moto", async () => {
    const partnerRepo = getTestDb().getRepository(PartnerOrmEntity);
    const motoRepo = getTestDb().getRepository(MotoOrmEntity);

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

    await motoRepo.delete(moto.id);

    const deletedMoto = await motoRepo.findOneBy({ model: "Model X" });
    expect(deletedMoto).toBeNull();
  });
});