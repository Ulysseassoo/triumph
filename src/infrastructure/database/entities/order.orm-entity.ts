import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: false })
  pieces: object[];

  @Column({ type: 'varchar', nullable: false })
  totalAmount: string;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  orderDate: string;

  @Column({ type: 'varchar', nullable: false })
  deliveryDate: string;


}