import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './app/products/products.module';
import { OrdersModule } from './app/orders/orders.module';
import { StoresModule } from './app/stores/stores.module';
import { AuthModule } from './app/auth/auth.module';
import { ReviewsModule } from './app/reviews/reviews.module';
import { UsersModule } from './app/users/users.module';
import { createConnection } from 'mysql2/promise';
import { CartsModule } from './app/carts/carts.module';
import AppDataSource from 'src/typeorm-cli.config';
import { HashingProvider } from './app/auth/providers/hashing.provider';
import { BcryptProvider } from './app/auth/providers/bcrypt.provider';

async function createDatabase() {
  const connection = await createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_ecroot',
    password: 'U76RTuf*TDB@YgA',
    port: 3306,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`freedb_ecommerce-test\`;`);
  await connection.end();
}

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    StoresModule,
    AuthModule,
    ReviewsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await createDatabase();

        return { ...AppDataSource.options, autoLoadEntities: true };
      },
    }),
    CartsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
