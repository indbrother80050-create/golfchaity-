import { Request, Response } from "express";
import { BaseController } from "./BaseController.ts";
import stripeService from "../services/StripeService.ts";

export class WebhookController extends BaseController {
  private static instance: WebhookController;

  private constructor() {
    super();
  }

  public static getInstance(): WebhookController {
    if (!WebhookController.instance) {
      WebhookController.instance = new WebhookController();
    }
    return WebhookController.instance;
  }

  public handleStripeWebhook = async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return this.sendError(res, "Missing stripe-signature header", 400);
    }

    try {
      // req.body must be raw string/buffer here
      const event = stripeService.constructEvent(req.body, signature as string);

      switch (event.type) {
        case "customer.subscription.created":
          await stripeService.handleSubscriptionCreated(event.data.object);
          break;
        case "customer.subscription.updated":
          await stripeService.handleSubscriptionUpdated(event.data.object);
          break;
        case "customer.subscription.deleted":
          await stripeService.handleSubscriptionDeleted(event.data.object);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return this.sendSuccess(res, { received: true });
    } catch (err: any) {
      console.error("Webhook Error:", err.message);
      return this.sendError(res, `Webhook Error: ${err.message}`, 400);
    }
  };
}

export default WebhookController.getInstance();
