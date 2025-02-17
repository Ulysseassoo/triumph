import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { NotificationOrmEntity } from "./notification.orm-entity";
import { PartnerOrmEntity } from "./partner.orm-entity";

@Entity("user")
export class UserOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 250, nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "boolean", nullable: true })
  isVerified: boolean;

  @Column({ type: "simple-array", nullable: true })
  role?: string[];

  @OneToMany(() => NotificationOrmEntity, (notification) => notification.user)
  notifications: NotificationOrmEntity[];

  @ManyToOne(() => PartnerOrmEntity, (partner) => partner.users)
  partner: PartnerOrmEntity;
}
