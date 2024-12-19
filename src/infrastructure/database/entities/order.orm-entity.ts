import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: false })  
  pieces: object[];

  @Column({ type: 'decimal', nullable: false })
  totalAmount: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  orderDate: string;

  @Column({ type: 'varchar', nullable: false })
  deliveryDate: string;


}