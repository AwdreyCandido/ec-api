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
import { AppDataSource } from 'typeorm-cli.config';
import { createConnection } from 'mysql2/promise';

async function createDatabase() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`ecommerce\`;`);
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
