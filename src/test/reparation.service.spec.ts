import { ReparationOrmEntity } from "../infrastructure/database/entities/reparation.orm-entity";
import { BreakdownOrmEntity } from "../infrastructure/database/entities/breakdown.orm-entity";
import { getTestDb } from "./setup";

describe("Reparation Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(ReparationOrmEntity).clear();
    await getTestDb().getRepository(BreakdownOrmEntity).clear();
  });

  it("should create a reparation", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);

    const breakdown = breakdownRepo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await breakdownRepo.save(breakdown);

    const reparation = reparationRepo.create({
      breakdownId: breakdown.id,
      description: "Fix engine",
      cost: 500,
      date: new Date(),
    });

    await reparationRepo.save(reparation);

    const savedReparation = await reparationRepo.findOneBy({ description: "Fix engine" });
    expect(savedReparation).toHaveProperty("id");
    expect(savedReparation.breakdownId).toBe(breakdown.id);
  });

  it("should find a reparation by id", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);

    const breakdown = breakdownRepo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await breakdownRepo.save(breakdown);

    const reparation = reparationRepo.create({
      breakdownId: breakdown.id,
      description: "Fix engine",
      cost: 500,
      date: new Date(),
    });

    await reparationRepo.save(reparation);

    const savedReparation = await reparationRepo.findOneBy({ description: "Fix engine" });
    expect(savedReparation).toBeDefined();
    expect(savedReparation.id).toBe(reparation.id);
    expect(savedReparation.breakdownId).toBe(breakdown.id);
  });

  it("should update a reparation", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);

    const breakdown = breakdownRepo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await breakdownRepo.save(breakdown);

    const reparation = reparationRepo.create({
      breakdownId: breakdown.id,
      description: "Fix engine",
      cost: 500,
      date: new Date(),
    });

    await reparationRepo.save(reparation);

    const updateReparationInfo = {
      ...reparation,
      description: "Fix transmission",
    };

    const updatedReparation = await reparationRepo.save(updateReparationInfo);
    expect(updatedReparation).toBeDefined();
    expect(updatedReparation.description).toBe("Fix transmission");
  });

  it("should delete a reparation", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);

    const breakdown = breakdownRepo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await breakdownRepo.save(breakdown);

    const reparation = reparationRepo.create({
      breakdownId: breakdown.id,
      description: "Fix engine",
      cost: 500,
      date: new Date(),
    });

    await reparationRepo.save(reparation);

    await reparationRepo.delete(reparation.id);

    const deletedReparation = await reparationRepo.findOneBy({ description: "Fix engine" });
    expect(deletedReparation).toBeNull();
  });
});