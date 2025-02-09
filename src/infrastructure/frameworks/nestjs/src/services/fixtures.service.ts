import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { BreakdownOrmEntity } from '../../../../database/entities/breakdown.orm-entity';
import { CorrectiveActionOrmEntity } from '../../../../database/entities/corrective-action.orm-entity';
import { MaintenanceOrmEntity } from '../../../../database/entities/maintenance.orm-entity';
import { MotoOrmEntity } from '../../../../database/entities/moto.orm-entity';
import { NotificationOrmEntity } from '../../../../database/entities/notification.orm-entity';
import { OrderOrmEntity } from '../../../../database/entities/order.orm-entity';
import { PartnerOrmEntity } from '../../../../database/entities/partner.orm-entity';
import { PieceOrmEntity } from '../../../../database/entities/piece.orm-entity';
import { ReparationOrmEntity } from '../../../../database/entities/reparation.orm-entity';
import { UserOrmEntity } from '../../../../database/entities/user.orm-entity';
import { WarrantyOrmEntity } from '../../../../database/entities/warranty.orm-entity';
import { MotoStatus } from '../../../../../domain/entities/moto.entity';
import { MaintenanceType } from '../../../../../domain/entities/maintenance.entity';
import { MotoMapper } from '../../../../database/mappers/moto.mapper';
import { DriverOrmEntity } from '../../../../database/entities/driver.orm-entity';
import { DriverLicenseOrmEntity } from '../../../../database/entities/driverLicense.orm-entity';
import { DriverExperienceOrmEntity } from '../../../../database/entities/driverExperience.orm-entity';
import { CrashOrmEntity } from '../../../../database/entities/crash.orm-entity';
import {
  AttemptOrmEntity,
  AttemptStatus,
} from '../../../../database/entities/attempt.orm-entity';
import { DriverLicenseStatus } from '../../../../../domain/entities/driverLicense.entity';
import { CrashStatus } from '../../../../../domain/entities/crash.entity';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(PartnerOrmEntity)
    private partnerRepo: Repository<PartnerOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private userRepo: Repository<UserOrmEntity>,
    @InjectRepository(MotoOrmEntity)
    private motoRepo: Repository<MotoOrmEntity>,
    @InjectRepository(MaintenanceOrmEntity)
    private maintenanceRepo: Repository<MaintenanceOrmEntity>,
    @InjectRepository(PieceOrmEntity)
    private pieceRepo: Repository<PieceOrmEntity>,
    @InjectRepository(OrderOrmEntity)
    private orderRepo: Repository<OrderOrmEntity>,
    @InjectRepository(WarrantyOrmEntity)
    private warrantyRepo: Repository<WarrantyOrmEntity>,
    @InjectRepository(BreakdownOrmEntity)
    private breakdownRepo: Repository<BreakdownOrmEntity>,
    @InjectRepository(ReparationOrmEntity)
    private reparationRepo: Repository<ReparationOrmEntity>,
    @InjectRepository(CorrectiveActionOrmEntity)
    private correctiveActionRepo: Repository<CorrectiveActionOrmEntity>,
    @InjectRepository(NotificationOrmEntity)
    private notificationRepo: Repository<NotificationOrmEntity>,
    @InjectRepository(DriverLicenseOrmEntity)
    private licenseRepo: Repository<DriverLicenseOrmEntity>,
    @InjectRepository(DriverOrmEntity)
    private driverRepo: Repository<DriverOrmEntity>,
    @InjectRepository(DriverExperienceOrmEntity)
    private experienceRepo: Repository<DriverExperienceOrmEntity>,
    @InjectRepository(CrashOrmEntity)
    private crashRepo: Repository<CrashOrmEntity>,
    @InjectRepository(AttemptOrmEntity)
    private attemptRepo: Repository<AttemptOrmEntity>,
  ) {}

  async clearDatabase() {
    await this.correctiveActionRepo.delete({});
    await this.reparationRepo.delete({});
    await this.breakdownRepo.delete({});
    await this.warrantyRepo.delete({});
    await this.orderRepo.delete({});
    await this.pieceRepo.delete({});
    await this.maintenanceRepo.delete({});
    await this.motoRepo.delete({});
    await this.notificationRepo.delete({});
    await this.licenseRepo.delete({});
    await this.experienceRepo.delete({});
    await this.crashRepo.delete({});
    await this.attemptRepo.delete({});
  }

  async loadFixtures() {
    const partners = await this.partnerRepo.find();

    const motos = await this.createMotos(partners);

    await this.createMaintenances(motos);
    await this.createNotifications();
    await this.createWarranties(motos);
    await this.createBreakdowns(motos);
    await this.createDrivers(motos);

    console.log('Fixtures loaded successfully!');
  }

  async createMotos(partners: PartnerOrmEntity[]): Promise<MotoOrmEntity[]> {
    const motos: MotoOrmEntity[] = [];

    for (const partner of partners) {
      for (let i = 0; i < 5; i++) {
        const moto = new MotoOrmEntity();
        moto.id = v4();
        moto.model = `Model ${Math.floor(Math.random() * 100)}`;
        moto.currentMileage = Math.floor(Math.random() * 10000);
        moto.price = Math.floor(Math.random() * 10000);
        moto.status = MotoStatus.InService;
        moto.partner = partner;
        moto.maintenances = [];

        motos.push(moto);
      }
    }

    return await this.motoRepo.save(motos);
  }

  private async createMaintenances(motos: MotoOrmEntity[]) {
    // Création des pièces détachées communes
    const commonPieces = await this.pieceRepo.save([
      this.createPiece('Filtre à huile', 'FILTRE', 15, 50, 10),
      this.createPiece('Kit chaîne', 'TRANSMISSION', 80, 30, 5),
      this.createPiece('Plaquettes de frein avant', 'FREINAGE', 45, 40, 15),
      this.createPiece("Bougie d'allumage", 'MOTEUR', 12, 100, 20),
      this.createPiece('Pneu arrière', 'ROUES', 120, 20, 5),
    ]);

    // Création des maintenances réalistes
    const maintenanceTemplates = [
      {
        type: MaintenanceType.PREVENTIF,
        interval: { mileage: 10000, timeInMonths: 12 },
        pieces: [
          { piece: commonPieces[0], quantity: 1 }, // Filtre à huile
          { piece: commonPieces[3], quantity: 4 }, // Bougies
        ],
        recommendation:
          'Vérifier la tension de la chaîne et contrôler les niveaux de liquides',
      },
      {
        type: MaintenanceType.CURATIF,
        interval: { mileage: 5000, timeInMonths: 6 },
        pieces: [
          { piece: commonPieces[2], quantity: 2 }, // Plaquettes frein
          { piece: commonPieces[4], quantity: 1 }, // Pneu
        ],
        recommendation:
          "Contrôler l'usure du disque de frein et l'équilibrage de la roue",
      },
      {
        type: MaintenanceType.PREVENTIF,
        interval: { mileage: 20000, timeInMonths: 24 },
        pieces: [
          { piece: commonPieces[1], quantity: 1 }, // Kit chaîne
          { piece: commonPieces[0], quantity: 2 }, // Filtres
        ],
        recommendation:
          'Graisser les axes de suspension et vérifier le jeu des commandes',
      },
      {
        type: MaintenanceType.CURATIF,
        interval: { mileage: 15000, timeInMonths: 18 },
        pieces: [
          { piece: commonPieces[4], quantity: 2 }, // Pneus
          { piece: commonPieces[2], quantity: 1 }, // Plaquettes
        ],
        recommendation: "Contrôler la parallélisme et l'usure des disques",
      },
      {
        type: MaintenanceType.PREVENTIF,
        interval: { mileage: 5000, timeInMonths: 3 },
        pieces: [
          { piece: commonPieces[0], quantity: 1 }, // Filtre
          { piece: commonPieces[3], quantity: 2 }, // Bougies
        ],
        recommendation:
          "Nettoyer le filtre à air et vérifier le système d'échappement",
      },
    ];

    // Création des maintenances pour chaque moto
    for (const moto of motos) {
      const template =
        maintenanceTemplates[
          Math.floor(Math.random() * maintenanceTemplates.length)
        ];

      // Vérification de l'éligibilité
      const lastMaintenance = await this.maintenanceRepo.findOne({
        where: { moto: { id: moto.id } },
        order: { plannedDate: 'DESC' },
      });

      const isEligible = !!lastMaintenance
        ? MotoMapper.toDomainEntity(moto).isEligibleForMaintenance(
            lastMaintenance.maintenanceInterval.mileage,
            lastMaintenance.maintenanceInterval.timeInMonths,
          )
        : true;

      if (!isEligible) {
        console.log(`Moto ${moto.id} n'est pas éligible pour un entretien`);
        continue;
      }

      const maintenance = new MaintenanceOrmEntity();
      maintenance.id = v4();
      maintenance.moto = moto;
      maintenance.maintenanceType = template.type;
      maintenance.plannedDate = new Date();
      maintenance.plannedDate.setMonth(
        maintenance.plannedDate.getMonth() + template.interval.timeInMonths,
      );
      maintenance.mileage = moto.currentMileage + template.interval.mileage;
      maintenance.maintenanceInterval = template.interval;
      maintenance.recommandations = template.recommendation;
      maintenance.cost = template.pieces.reduce(
        (sum, p) => sum + p.piece.cost * p.quantity,
        150,
      ); // Main d'œuvre

      // Association des pièces
      maintenance.pieces = template.pieces.map((p) => {
        const piece = new PieceOrmEntity();
        Object.assign(piece, p.piece);
        piece.quantity = p.quantity;
        return piece;
      });

      await this.maintenanceRepo.save(maintenance);

      // Mise à jour du stock
      for (const p of template.pieces) {
        await this.pieceRepo.decrement(
          { id: p.piece.id },
          'quantity',
          p.quantity,
        );
      }
    }
  }

  private createPiece(
    name: string,
    type: string,
    cost: number,
    quantity: number,
    alertLimit: number,
  ): PieceOrmEntity {
    const piece = new PieceOrmEntity();
    piece.id = v4();
    piece.name = name;
    piece.type = type;
    piece.cost = cost;
    piece.quantity = quantity;
    piece.alertLimit = alertLimit;
    return piece;
  }

  private async createNotifications() {
    const users = await this.userRepo.find();
    const notifications: NotificationOrmEntity[] = [];

    for (const user of users) {
      for (let i = 0; i < 2; i++) {
        const notification = new NotificationOrmEntity();
        notification.id = v4();
        notification.user = user;
        notification.date = new Date();
        notification.message = `Notification message ${i + 1} for user ${user.id}`;
        notification.isRead = false;

        notifications.push(notification);
      }
    }

    await this.notificationRepo.save(notifications);
  }

  private async createWarranties(motos: MotoOrmEntity[]) {
    const warranties: WarrantyOrmEntity[] = [];

    for (const moto of motos) {
      const warranty = new WarrantyOrmEntity();
      warranty.id = v4();
      warranty.motoId = moto.id;
      warranty.startDate = new Date();
      warranty.endDate = new Date(
        new Date().setFullYear(new Date().getFullYear() + 2),
      );
      warranty.breakdowns = [];

      warranties.push(warranty);
    }

    await this.warrantyRepo.save(warranties);
  }

  private async createBreakdowns(motos: MotoOrmEntity[]) {
    for (const moto of motos) {
      const numberOfBreakdowns = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < numberOfBreakdowns; i++) {
        const breakdown = new BreakdownOrmEntity();
        breakdown.id = v4();
        breakdown.motoId = moto.id;
        breakdown.date = new Date();
        breakdown.description = `Breakdown description ${i + 1} for moto ${moto.id}`;

        await this.breakdownRepo.save(breakdown);

        await this.createRepairsAndActions(breakdown);
      }
    }
  }

  private async createRepairsAndActions(breakdown: BreakdownOrmEntity) {
    for (let i = 0; i < 4; i++) {
      const repair = new ReparationOrmEntity();
      repair.id = v4();
      repair.breakdownId = breakdown.id;
      repair.description = `Repair description ${i + 1} for breakdown ${breakdown.id}`;
      repair.cost = Math.floor(Math.random() * 1000) + 100;
      repair.date = new Date(new Date().setDate(new Date().getDate() + i * 7));

      await this.reparationRepo.save(repair);

      for (let j = 0; j < 4; j++) {
        const action = new CorrectiveActionOrmEntity();
        action.id = v4();
        action.reparationId = repair.id;
        action.description = `Corrective action ${j + 1} for repair ${repair.id}`;
        action.date = new Date(
          new Date().setDate(repair.date.getDate() + j * 2),
        );

        await this.correctiveActionRepo.save(action);
      }
    }
  }

  async createDrivers(motos: MotoOrmEntity[]): Promise<DriverOrmEntity[]> {
    // Création des conducteurs
    const drivers = await this.driverRepo.save([
      this.createDriver(
        'Jean',
        'Dupont',
        '1990-05-15',
        '12 rue de Paris, 75001 Paris',
      ),
      this.createDriver(
        'Marie',
        'Martin',
        '1985-08-22',
        '5 avenue des Champs-Élysées, 75008 Paris',
      ),
      this.createDriver(
        'Pierre',
        'Leroy',
        '1995-02-10',
        '8 rue de Lyon, 69002 Lyon',
      ),
    ]);

    // Licences
    await this.createLicenses(drivers);

    // Expériences
    await this.createExperiences(drivers);

    // Accidents
    await this.createCrashes(drivers, motos);

    // Essais
    await this.createAttempts(drivers, motos);

    return drivers;
  }

  private createDriver(
    firstname: string,
    lastname: string,
    birthdate: string,
    address: string,
  ): DriverOrmEntity {
    const driver = new DriverOrmEntity();
    driver.firstname = firstname;
    driver.lastname = lastname;
    driver.birthdate = new Date(birthdate);
    driver.addresse = address;
    return driver;
  }

  private async createLicenses(drivers: DriverOrmEntity[]) {
    const licenses = drivers.flatMap((driver) => [
      this.createLicense(
        driver,
        'B123456789',
        'B',
        '2025-12-31',
        '2020-01-01',
        'France',
        DriverLicenseStatus.VALID,
      ),
      this.createLicense(
        driver,
        'A987654321',
        'A',
        '2024-06-30',
        '2018-03-15',
        'France',
        DriverLicenseStatus.VALID,
      ),
    ]);

    await this.licenseRepo.save(licenses);
  }

  private createLicense(
    driver: DriverOrmEntity,
    number: string,
    category: string,
    expiry: string,
    obtain: string,
    country: string,
    status: DriverLicenseStatus,
  ): DriverLicenseOrmEntity {
    const license = new DriverLicenseOrmEntity();
    license.licenseNumber = number;
    license.category = category;
    license.expiryDate = new Date(expiry);
    license.obtainDate = new Date(obtain);
    license.country = country;
    license.status = status;
    license.driver = driver;
    return license;
  }

  private async createExperiences(drivers: DriverOrmEntity[]) {
    const experiences = drivers.map((driver) =>
      this.createExperience(
        driver,
        '5 ans',
        'Moto',
        false,
        true,
        'Expérience professionnelle en livraison urbaine',
      ),
    );

    await this.experienceRepo.save(experiences);
  }

  private createExperience(
    driver: DriverOrmEntity,
    duration: string,
    type: string,
    rented: boolean,
    professional: boolean,
    feedback: string,
  ): DriverExperienceOrmEntity {
    const exp = new DriverExperienceOrmEntity();
    exp.duration = duration;
    exp.type = type;
    exp.rented = rented;
    exp.professional = professional;
    exp.feedback = feedback;
    exp.driver = driver;
    return exp;
  }

  private async createCrashes(
    drivers: DriverOrmEntity[],
    motos: MotoOrmEntity[],
  ) {
    const crashes = drivers.flatMap((driver, index) => {
      const moto = motos[index % motos.length];
      return [
        this.createCrash(
          driver,
          moto,
          'Collision',
          '2023-03-15',
          'Accrochage avec un véhicule stationné',
          'Paris 15e',
          'Responsabilité partagée',
          'Rayure sur carénage',
          CrashStatus.RESOLVED,
        ),
        this.createCrash(
          driver,
          moto,
          'Chute',
          '2022-08-10',
          'Perte de contrôle en virage',
          'Route de montagne',
          'Faute du conducteur',
          'Rétroviseur cassé',
          CrashStatus.GOING,
        ),
      ];
    });

    await this.crashRepo.save(crashes);
  }

  private createCrash(
    driver: DriverOrmEntity,
    moto: MotoOrmEntity,
    type: string,
    date: string,
    description: string,
    location: string,
    responsability: string,
    consequence: string,
    status: CrashStatus,
  ): CrashOrmEntity {
    const crash = new CrashOrmEntity();
    crash.type = type;
    crash.date = new Date(date);
    crash.description = description;
    crash.location = location;
    crash.responsability = responsability;
    crash.consequence = consequence;
    crash.status = status;
    crash.driver = driver;
    crash.moto = moto;
    return crash;
  }

  private async createAttempts(
    drivers: DriverOrmEntity[],
    motos: MotoOrmEntity[],
  ) {
    const attempts = drivers.flatMap((driver, index) => {
      const moto = motos[index % motos.length];
      return [
        this.createAttempt(
          moto,
          driver,
          '2023-01-10',
          '2023-01-10',
          1500,
          1520,
          AttemptStatus.GOING,
        ),
        this.createAttempt(
          moto,
          driver,
          '2023-02-15',
          '2023-02-15',
          2000,
          2035,
          AttemptStatus.CANCEL,
        ),
      ];
    });

    await this.attemptRepo.save(attempts);
  }

  private createAttempt(
    moto: MotoOrmEntity,
    driver: DriverOrmEntity,
    start: string,
    end: string,
    startKm: number,
    endKm: number,
    status: AttemptStatus,
  ): AttemptOrmEntity {
    const attempt = new AttemptOrmEntity();
    attempt.startDate = new Date(start);
    attempt.endDate = new Date(end);
    attempt.startKilometer = startKm;
    attempt.endKilometer = endKm;
    attempt.status = status;
    attempt.moto = moto;
    attempt.driver = driver;
    return attempt;
  }
}
