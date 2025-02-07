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

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(PartnerOrmEntity) private partnerRepo: Repository<PartnerOrmEntity>,
    @InjectRepository(UserOrmEntity) private userRepo: Repository<UserOrmEntity>,
    @InjectRepository(MotoOrmEntity) private motoRepo: Repository<MotoOrmEntity>,
    @InjectRepository(MaintenanceOrmEntity) private maintenanceRepo: Repository<MaintenanceOrmEntity>,
    @InjectRepository(PieceOrmEntity) private pieceRepo: Repository<PieceOrmEntity>,
    @InjectRepository(OrderOrmEntity) private orderRepo: Repository<OrderOrmEntity>,
    @InjectRepository(WarrantyOrmEntity) private warrantyRepo: Repository<WarrantyOrmEntity>,
    @InjectRepository(BreakdownOrmEntity) private breakdownRepo: Repository<BreakdownOrmEntity>,
    @InjectRepository(ReparationOrmEntity) private reparationRepo: Repository<ReparationOrmEntity>,
    @InjectRepository(CorrectiveActionOrmEntity) private correctiveActionRepo: Repository<CorrectiveActionOrmEntity>,
    @InjectRepository(NotificationOrmEntity) private notificationRepo: Repository<NotificationOrmEntity>,
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
  }

  async loadFixtures() {
    const partners = await this.partnerRepo.find();
  
    const motos = await this.createMotos(partners);
    
    await this.createMaintenances(motos);

    console.log('Fixtures loaded successfully!');
  }

  async createMotos(partners: PartnerOrmEntity[]): Promise<MotoOrmEntity[]> {
    const motos: MotoOrmEntity[] = [];

    for (const partner of partners) {
      const moto = new MotoOrmEntity();
      moto.id = v4();
      moto.model = `Model ${Math.floor(Math.random() * 100)}`;
      moto.currentMileage = Math.floor(Math.random() * 10000);
      moto.price = Math.floor(Math.random() * 10000);
      moto.status = MotoStatus.InService;
      moto.partner = partner;

      motos.push(moto);
    }

    return await this.motoRepo.save(motos);
  }

  private async createMaintenances(motos: MotoOrmEntity[]) {
    const maintenances = motos.map(moto => ({
      motoId: moto.id,
      maintenanceType: MaintenanceType.PREVENTIF, 
      plannedDate: new Date('2024-04-01'),
      mileage: 10000,
      maintenanceInterval: { mileage: 10000, timeInMonths: 1 },
      pieces: []
    }));
  
    return this.maintenanceRepo.save(maintenances);
  }

}