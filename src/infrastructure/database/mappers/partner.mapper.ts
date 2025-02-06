import { PartnerOrmEntity } from './../entities/partner.orm-entity';
import { Partner } from '../../../domain/entities/partner.entity';

export class PartnerMapper {
  static toOrmEntity(partner: Partner): PartnerOrmEntity {
    const ormPartner = new PartnerOrmEntity();
    ormPartner.id = partner.id;
    ormPartner.nom = partner.name;
    ormPartner.contactInfo = partner.contact_info;
    return ormPartner;
  }

  static toDomainEntity(ormPartner: PartnerOrmEntity): Partner {
    return new Partner(
      ormPartner.id,
      ormPartner.nom,
      ormPartner.contactInfo
    );
  }
}