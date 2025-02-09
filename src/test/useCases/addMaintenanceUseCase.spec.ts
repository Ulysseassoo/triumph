import { v4 as uuidv4 } from "uuid";
import { BadRequestException } from "../../application/exceptions/BadRequestException";
import { NotFoundException } from "../../application/exceptions/NotFoundException";
import { MaintenanceRepositoryInterface } from "../../application/repositories/MaintenanceRepositoryInterface";
import { MotoRepositoryInterface } from "../../application/repositories/MotoRepositoryInterface";
import { AddMaintenanceUseCase } from "../../application/usecases/maintenance/AddMaintenanceUseCase";
import { SendNotificationUseCase } from "../../application/usecases/notification/SendNotificationUseCase";
import {
  Maintenance,
  MaintenanceType,
} from "../../domain/entities/maintenance.entity";
import { Moto, MotoStatus } from "../../domain/entities/moto.entity";

describe("AddMaintenanceUseCase", () => {
  let addMaintenanceUseCase: AddMaintenanceUseCase;
  let maintenanceRepository: jest.Mocked<MaintenanceRepositoryInterface>;
  let motoRepository: jest.Mocked<MotoRepositoryInterface>;
  let sendNotificationUseCase: jest.Mocked<SendNotificationUseCase>;

  beforeEach(() => {
    maintenanceRepository = {
      create: jest.fn(),
      findLatestByMotoId: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByMotoId: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    motoRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    };

    sendNotificationUseCase = {
      execute: jest.fn(),
    } as any;

    addMaintenanceUseCase = new AddMaintenanceUseCase(
      maintenanceRepository,
      motoRepository,
      sendNotificationUseCase
    );
  });

  it("should create a maintenance", async () => {
    const motoId = "moto-id";
    const kilometrageInterval = 1000;
    const tempsInterval = 6;
    const recommandations = "Check oil";

    const moto = new Moto(
      motoId,
      "Model X",
      { id: "partner-id", name: "", contact_info: "contact@example.com" },
      5000,
      1200,
      MotoStatus.InService,
      []
    );

    const maintenance = new Maintenance(
      uuidv4(),
      motoId,
      MaintenanceType.PREVENTIF,
      new Date(),
      6000,
      null,
      { mileage: 1000, timeInMonths: 6 },
      recommandations,
      40
    );

    motoRepository.findById.mockResolvedValue(moto);
    maintenanceRepository.findLatestByMotoId.mockResolvedValue(null);
    maintenanceRepository.create.mockResolvedValue(maintenance);

    const result = await addMaintenanceUseCase.execute({
      motoId,
      kilometrageInterval,
      tempsInterval,
      recommandations,
    });

    expect(result).toEqual(maintenance);
    expect(motoRepository.findById).toHaveBeenCalledWith(motoId);
    expect(maintenanceRepository.create).toHaveBeenCalledWith(
      expect.any(Maintenance)
    );
    expect(sendNotificationUseCase.execute).toHaveBeenCalled();
  });

  it("should throw NotFoundException if moto is not found", async () => {
    const motoId = "moto-id";
    const kilometrageInterval = 1000;
    const tempsInterval = 6;
    const recommandations = "Check oil";

    motoRepository.findById.mockResolvedValue(null);

    await expect(
      addMaintenanceUseCase.execute({
        motoId,
        kilometrageInterval,
        tempsInterval,
        recommandations,
      })
    ).rejects.toThrow(NotFoundException);
  });

  it("should throw BadRequestException if moto is not eligible for maintenance", async () => {
    const motoId = "moto-id";
    const kilometrageInterval = 1000;
    const tempsInterval = 6;
    const recommandations = "Check oil";

    const moto = new Moto(
      motoId,
      "Model X",
      { id: "partner-id", name: "", contact_info: "contact@example.com" },
      5000,
      1200,
      MotoStatus.InService,
      []
    );
    
    moto.isEligibleForMaintenance = jest.fn().mockReturnValue(false);

    motoRepository.findById.mockResolvedValue(moto);

    await expect(
      addMaintenanceUseCase.execute({
        motoId,
        kilometrageInterval,
        tempsInterval,
        recommandations,
      })
    ).rejects.toThrow(BadRequestException);
  });
});
