import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BreakdownOrmEntity } from "./breakdown.orm-entity";

@Entity("warranty")
export class WarrantyOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  motoId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToMany(() => BreakdownOrmEntity, (breakdown) => breakdown.warranty)
  breakdowns: BreakdownOrmEntity[];
}