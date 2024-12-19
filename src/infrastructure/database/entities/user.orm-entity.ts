import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NotificationOrmEntity } from './notification.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: "timestamp" , nullable: true})
  passwordValidUntil?: Date;

  @Column({ type: "boolean", nullable: true})
  isVerified: boolean;

  @Column({ type: "simple-array", nullable: true })
  role?: string[];

  @OneToMany(() => NotificationOrmEntity, (notification) => notification.user)
  notifications: NotificationOrmEntity[];
}