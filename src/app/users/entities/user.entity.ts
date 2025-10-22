import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum USER_ROLE {
  ADMIN = "admin",
  CLIENT = "client",
  OWNER = "owner",
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 60,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: false
  })
  address: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.CLIENT
  })
  role: USER_ROLE;
}
