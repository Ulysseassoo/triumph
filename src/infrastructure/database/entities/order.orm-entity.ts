import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OrderPiece } from '../../../domain/entities/order.entity';
@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { nullable: false })  
  pieces: OrderPiece;

  @Column({ type: 'decimal', nullable: false })
  totalAmount: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  orderDate: string;

  @Column({ type: 'varchar', nullable: false })
  deliveryDate: string;


}