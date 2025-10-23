import { ShoppingCart } from 'src/app/carts/entities/shopping-cart.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum USER_ROLE {
  ADMIN = 'admin',
  CLIENT = 'client',
  OWNER = 'owner',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ShoppingCart, (cart) => cart.user, { cascade: true })
  cart: ShoppingCart;

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
    nullable: true,
    default: null,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.CLIENT,
  })
  role: USER_ROLE;
}
