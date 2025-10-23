import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null
  })
  logoUrl: string;

  @Column({
    type: 'varchar',
    length: 60,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0.0,
  })
  ratings: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
