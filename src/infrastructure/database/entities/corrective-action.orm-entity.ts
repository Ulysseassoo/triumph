import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ReparationOrmEntity } from "./reparation.orm-entity";

@Entity()
export class CorrectiveActionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reparationId: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => ReparationOrmEntity, (reparation) => reparation.correctiveActions)
  reparation: ReparationOrmEntity;
}