import { Router } from "express";
import authController from "../controllers/AuthController.ts";
import { authenticate } from "../middlewares/auth.ts";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.getMe);
router.post("/mock-subscription", authenticate, authController.mockSubscription);

export default router;
