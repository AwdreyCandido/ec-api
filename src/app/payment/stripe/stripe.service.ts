import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      'sk_test_51SMQyhEXhD4PFG4am5wMcBVST5zu7R5zoKoLyzdFkH4OJoRWfNOHI9g7hSNBTjaAHdHRbd7hqr6tozc77isgdNNT00mvSU7YbH',
      {
        apiVersion: '2025-09-30.clover',
      },
    );
  }

  async createPaymentIntent(amount: number) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    });
    return paymentIntent.client_secret;
  }
}
