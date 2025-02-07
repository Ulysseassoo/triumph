import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { BreakdownOrmEntity } from "./breakdown.orm-entity";
import { CorrectiveActionOrmEntity } from "./corrective-action.orm-entity";

@Entity("reparation")
export class ReparationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  breakdownId: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  cost: number;

  @ManyToOne(() => BreakdownOrmEntity, (breakdown) => breakdown.reparations)
  breakdown: BreakdownOrmEntity;

  @OneToMany(() => CorrectiveActionOrmEntity, (correctiveAction) => correctiveAction.reparation)
  correctiveActions: CorrectiveActionOrmEntity[];
}