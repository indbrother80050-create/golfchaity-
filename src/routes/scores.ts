import { Router } from "express";
import scoreController from "../controllers/ScoreController.ts";
import { authenticate, checkSubscription } from "../middlewares/auth.ts";

const router = Router();

router.get("/", authenticate, scoreController.getScores);
router.post("/", authenticate, checkSubscription, scoreController.createScore);

export default router;
