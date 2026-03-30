import { Router } from "express";
import express from "express";
import webhookController from "../controllers/WebhookController.ts";

const router = Router();

// Stripe requires the raw body to construct the event
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  webhookController.handleStripeWebhook
);

export default router;
