import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany ,ManyToMany,JoinTable } from "typeorm";
import { PieceOrmEntity } from "./piece.orm-entity";
import { OrderPiece } from '../../../domain/entities/order.entity';
@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', nullable: false })
  totalAmount: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'varchar', nullable: false })
  orderDate: string;

  @Column({ type: 'varchar', nullable: false })
  deliveryDate: string;

  @Column('json', { nullable: false })  
  previousQuantity: OrderPiece[];

  @ManyToMany(() => PieceOrmEntity, piece => piece.orders)

  @JoinTable()
  pieces: PieceOrmEntity[];
}