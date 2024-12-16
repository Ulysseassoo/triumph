import { Entity, ObjectIdColumn, Column} from 'typeorm';

@Entity('users')
export class UserMongo {
  @ObjectIdColumn()
  _id?: string;

  @Column({ type: 'string', nullable: false })
  id: string;

  @Column({ type: 'string', nullable: false })
  name: string;

  @Column({ type: 'string', nullable: false, unique: true })
  email: string;

  @Column({ type: 'string', nullable: false })
  password: string;

  @Column({ type: "date" })
  passwordValidUntil: Date;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "array" })
  role: string[];
}