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
import { CartsModule } from './app/carts/carts.module';
import { HashingProvider } from './app/auth/providers/hashing.provider';
import { BcryptProvider } from './app/auth/providers/bcrypt.provider';
import { StripeModule } from './app/payment/stripe/stripe.module';
import AppDataSource from './typeorm-cli.config';

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
        return { ...AppDataSource.options, autoLoadEntities: true };
      },
    }),
    CartsModule,
    StripeModule,
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
