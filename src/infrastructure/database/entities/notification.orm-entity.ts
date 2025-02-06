import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity("notification")
export class NotificationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  date: Date;

  @ManyToOne(() => UserOrmEntity, (user) => user.notifications)
  user: UserOrmEntity;
}