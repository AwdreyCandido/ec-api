import { DataSource } from 'typeorm';
import { User } from './app/users/entities/user.entity';
import { Product } from './app/products/entities/product.entity';
import { Store } from './app/stores/entities/store.entity';
import { Review } from './app/reviews/entities/review.entity';
import { Order } from './app/orders/entities/order.entity';
import { OrderGroup } from './app/orders/entities/order-group.entity';
import { ShoppingCart } from './app/carts/entities/shopping-cart.entity';
import { CartItem } from './app/carts/entities/cart-item.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'sql.freedb.tech',
  port: 3306,
  username: 'freedb_ecroot',
  password: 'U76RTuf*TDB@YgA',
  database: 'freedb_ecommerce-test',
  entities: [
    User,
    Product,
    Store,
    Review,
    Order,
    OrderGroup,
    ShoppingCart,
    CartItem,
  ],
  migrations: ['src/migrations/*.js'],
  synchronize: false,
});

export default AppDataSource;
