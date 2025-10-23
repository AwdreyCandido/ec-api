import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from 'src/app/stores/entities/store.entity';
import { Review } from 'src/app/reviews/entities/review.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  imageUrl: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  stock: number;
}
