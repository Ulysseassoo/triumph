import { CorrectiveActionOrmEntity } from "../infrastructure/database/entities/corrective-action.orm-entity";
import { ReparationOrmEntity } from "../infrastructure/database/entities/reparation.orm-entity";
import { BreakdownOrmEntity } from "../infrastructure/database/entities/breakdown.orm-entity";
import { getTestDb } from "./setup";

describe("CorrectiveAction Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(CorrectiveActionOrmEntity).clear();
    await getTestDb().getRepository(ReparationOrmEntity).clear();
    await getTestDb().getRepository(BreakdownOrmEntity).clear();
  });

  it("should create a corrective action", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);
    const correctiveActionRepo = getTestDb().getRepository(CorrectiveActionOrmEntity);

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

    const correctiveAction = correctiveActionRepo.create({
      reparationId: reparation.id,
      description: "Replace faulty part",
      date: new Date(),
    });

    await correctiveActionRepo.save(correctiveAction);

    const savedCorrectiveAction = await correctiveActionRepo.findOne({
      where: { description: "Replace faulty part" },
      relations: ["reparation"],
    });
    expect(savedCorrectiveAction).toHaveProperty("id");
    expect(savedCorrectiveAction.reparation.id).toBe(reparation.id);
  });

  it("should find a corrective action by id", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);
    const correctiveActionRepo = getTestDb().getRepository(CorrectiveActionOrmEntity);

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

    const correctiveAction = correctiveActionRepo.create({
      reparationId: reparation.id,
      description: "Replace faulty part",
      date: new Date(),
    });

    await correctiveActionRepo.save(correctiveAction);

    const savedCorrectiveAction = await correctiveActionRepo.findOne({
      where: { description: "Replace faulty part" },
      relations: ["reparation"],
    });
    expect(savedCorrectiveAction).toBeDefined();
    expect(savedCorrectiveAction.id).toBe(correctiveAction.id);
    expect(savedCorrectiveAction.reparation.id).toBe(reparation.id);
  });

  it("should update a corrective action", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);
    const correctiveActionRepo = getTestDb().getRepository(CorrectiveActionOrmEntity);

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

    const correctiveAction = correctiveActionRepo.create({
      reparationId: reparation.id,
      description: "Replace faulty part",
      date: new Date(),
    });

    await correctiveActionRepo.save(correctiveAction);

    const updateCorrectiveActionInfo = {
      ...correctiveAction,
      description: "Inspect and replace faulty part",
    };

    const updatedCorrectiveAction = await correctiveActionRepo.save(updateCorrectiveActionInfo);
    expect(updatedCorrectiveAction).toBeDefined();
    expect(updatedCorrectiveAction.description).toBe("Inspect and replace faulty part");
  });

  it("should delete a corrective action", async () => {
    const breakdownRepo = getTestDb().getRepository(BreakdownOrmEntity);
    const reparationRepo = getTestDb().getRepository(ReparationOrmEntity);
    const correctiveActionRepo = getTestDb().getRepository(CorrectiveActionOrmEntity);

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

    const correctiveAction = correctiveActionRepo.create({
      reparationId: reparation.id,
      description: "Replace faulty part",
      date: new Date(),
    });

    await correctiveActionRepo.save(correctiveAction);

    await correctiveActionRepo.delete(correctiveAction.id);

    const deletedCorrectiveAction = await correctiveActionRepo.findOne({
      where: { description: "Replace faulty part" },
      relations: ["reparation"],
    });
    expect(deletedCorrectiveAction).toBeNull();
  });
});