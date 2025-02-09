import { OrderOrmEntity } from "../infrastructure/database/entities/order.orm-entity";
import { getTestDb } from "./setup";

describe("Order Service", () => {
  beforeEach(async () => {
    await getTestDb().getRepository(OrderOrmEntity).clear();
  });

  it("should create an order", async () => {
    const repo = getTestDb().getRepository(OrderOrmEntity);
    const order = repo.create({
      totalAmount: 200,
      status: "pending",
      orderDate: new Date().toISOString(),
      deliveryDate: new Date().toISOString(),
      previousQuantity: [],
    });

    await repo.save(order);

    const savedOrder = await repo.findOneBy({ id: order.id });
    expect(savedOrder).toHaveProperty("id");
  });

  it("should find an order by id", async () => {
    const repo = getTestDb().getRepository(OrderOrmEntity);
    const order = repo.create({
      totalAmount: 200,
      status: "pending",
      orderDate: new Date().toISOString(),
      deliveryDate: new Date().toISOString(),
      previousQuantity: [],
    });

    const savedOrder = await repo.save(order);

    const foundOrder = await repo.findOneBy({ id: savedOrder.id });
    expect(foundOrder).toBeDefined();
    expect(foundOrder.id).toBe(savedOrder.id);
  });

  it("should delete an order", async () => {
    const repo = getTestDb().getRepository(OrderOrmEntity);
    const order = repo.create({
      totalAmount: 200,
      status: "pending",
      orderDate: new Date().toISOString(),
      deliveryDate: new Date().toISOString(),
      previousQuantity: [],
    });

    const savedOrder = await repo.save(order);

    await repo.delete(savedOrder.id);

    const deletedOrder = await repo.findOneBy({ id: savedOrder.id });
    expect(deletedOrder).toBeNull();
  });
});
