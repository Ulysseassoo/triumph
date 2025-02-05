import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { WarrantyOrmEntity } from "./warranty.orm-entity";
import { ReparationOrmEntity } from "./reparation.orm-entity";

@Entity()
export class BreakdownOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  motoId: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => WarrantyOrmEntity, (warranty) => warranty.breakdowns)
  warranty: WarrantyOrmEntity;

  @OneToMany(() => ReparationOrmEntity, (reparation) => reparation.breakdown)
  reparations: ReparationOrmEntity[];
}