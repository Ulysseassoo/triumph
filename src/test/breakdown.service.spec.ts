import { BreakdownOrmEntity } from "../infrastructure/database/entities/breakdown.orm-entity";
import { getTestDb } from "./setup";

describe("Breakdown Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(BreakdownOrmEntity).clear();
  });

  it("should create a breakdown", async () => {
    const repo = getTestDb().getRepository(BreakdownOrmEntity);
    const breakdown = repo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await repo.save(breakdown);

    const savedBreakdown = await repo.findOneBy({ description: "Engine failure" });
    expect(savedBreakdown).toHaveProperty("id");
  });

  it("should find a breakdown by id", async () => {
    const repo = getTestDb().getRepository(BreakdownOrmEntity);
    const breakdown = repo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await repo.save(breakdown);

    const savedBreakdown = await repo.findOneBy({ description: "Engine failure" });
    expect(savedBreakdown).toBeDefined();
    expect(savedBreakdown.id).toBe(breakdown.id);
  });

  it("should update a breakdown", async () => {
    const repo = getTestDb().getRepository(BreakdownOrmEntity);
    const breakdown = repo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await repo.save(breakdown);

    const updateBreakdownInfo = {
      ...breakdown,
      description: "Transmission failure",
    };

    const updatedBreakdown = await repo.save(updateBreakdownInfo);
    expect(updatedBreakdown).toBeDefined();
    expect(updatedBreakdown.description).toBe("Transmission failure");
  });

  it("should delete a breakdown", async () => {
    const repo = getTestDb().getRepository(BreakdownOrmEntity);
    const breakdown = repo.create({
      motoId: "moto-id",
      description: "Engine failure",
      date: new Date(),
    });

    await repo.save(breakdown);

    await repo.delete(breakdown.id);

    const deletedBreakdown = await repo.findOneBy({ description: "Engine failure" });
    expect(deletedBreakdown).toBeNull();
  });
});