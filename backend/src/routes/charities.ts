import { Router } from "express";
import charityController from "../controllers/CharityController.ts";
import { authenticate, authorize } from "../middlewares/auth.ts";

const router = Router();

router.get("/", charityController.getCharities);
router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  charityController.createCharity
);

export default router;
