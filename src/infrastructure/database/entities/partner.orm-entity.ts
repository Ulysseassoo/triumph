import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";
import { MotoOrmEntity } from "./moto.orm-entity";

@Entity('partner')
export class PartnerOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nom', type: 'varchar', length: 100 })
  nom: string;

  @Column({ name: 'contact_info', type: 'text' })
  contactInfo: string;

  @OneToMany(() => UserOrmEntity, (user) => user.partner)
  users: UserOrmEntity[];

  @OneToMany(() => MotoOrmEntity, (moto) => moto.partner)
  motos: MotoOrmEntity[];
}