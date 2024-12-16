import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pieces')
export class PieceOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false })
  quantity: string;

  @Column({ type: 'varchar', nullable: false })
  cost: string;

  @Column({ type: 'varchar', nullable: false })
  alertLimit: string;
}