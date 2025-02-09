import { WarrantyOrmEntity } from "../infrastructure/database/entities/warranty.orm-entity";
import { getTestDb } from "./setup";

describe("Warranty Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(WarrantyOrmEntity).clear();
  });

  it("should create a warranty", async () => {
    const repo = getTestDb().getRepository(WarrantyOrmEntity);
    const warranty = repo.create({
      motoId: "moto-id",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    });

    await repo.save(warranty);

    const savedWarranty = await repo.findOneBy({ motoId: "moto-id" });
    expect(savedWarranty).toHaveProperty("id");
  });

  it("should find a warranty by id", async () => {
    const repo = getTestDb().getRepository(WarrantyOrmEntity);
    const warranty = repo.create({
      motoId: "moto-id",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    });

    await repo.save(warranty);

    const savedWarranty = await repo.findOneBy({ motoId: "moto-id" });
    expect(savedWarranty).toBeDefined();
    expect(savedWarranty.id).toBe(warranty.id);
  });

  it("should update a warranty", async () => {
    const repo = getTestDb().getRepository(WarrantyOrmEntity);
    const warranty = repo.create({
      motoId: "moto-id",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    });

    await repo.save(warranty);

    const updateWarrantyInfo = {
      ...warranty,
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
    };

    const updatedWarranty = await repo.save(updateWarrantyInfo);
    expect(updatedWarranty).toBeDefined();
    expect(updatedWarranty.endDate.getFullYear()).toBe(new Date().getFullYear() + 3);
  });

  it("should delete a warranty", async () => {
    const repo = getTestDb().getRepository(WarrantyOrmEntity);
    const warranty = repo.create({
      motoId: "moto-id",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    });

    await repo.save(warranty);

    await repo.delete(warranty.id);

    const deletedWarranty = await repo.findOneBy({ motoId: "moto-id" });
    expect(deletedWarranty).toBeNull();
  });
});