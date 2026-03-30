import Stripe from "stripe";
import prisma from "../lib/prisma.ts";

export class StripeService {
  private static instance: StripeService;
  private stripe: Stripe | null = null;

  private constructor() {}

  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  private getStripe(): Stripe {
    if (!this.stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) {
        throw new Error("STRIPE_SECRET_KEY environment variable is required");
      }
      this.stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
    }
    return this.stripe;
  }

  public constructEvent(payload: string | Buffer, signature: string): Stripe.Event {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error("STRIPE_WEBHOOK_SECRET environment variable is required");
    }
    return this.getStripe().webhooks.constructEvent(payload, signature, secret);
  }

  public async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    console.log(`Subscription created: ${subscription.id} for customer ${customerId}`);
    
    await prisma.subscription.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        stripeSubscriptionId: subscription.id,
        status: subscription.status.toUpperCase(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    });
  }

  public async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    console.log(`Subscription updated: ${subscription.id} for customer ${customerId}`);
    
    await prisma.subscription.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        status: subscription.status.toUpperCase(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    });
  }

  public async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    console.log(`Subscription deleted: ${subscription.id} for customer ${customerId}`);
    
    await prisma.subscription.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        status: "CANCELLED",
      }
    });
  }
}

export default StripeService.getInstance();
