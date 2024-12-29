  import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


  @Entity('users')
  export class UserOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: "date" , nullable: true})
    passwordValidUntil?: Date;

    @Column({ type: "boolean", nullable: true})
    isVerified: boolean;

    @Column({ type: "simple-array", nullable: true })
    role?: string[];

  }