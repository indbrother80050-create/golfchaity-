import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.ts";
import { registerSchema, loginSchema } from "../lib/validations.ts";
import { authenticate, AuthRequest } from "../middlewares/auth.ts";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret-key";

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        charityId: data.charityId || undefined,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "none" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });

    res.json({ user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

router.get("/me", authenticate, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: { subscription: true, charity: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/mock-subscription", authenticate, async (req: AuthRequest, res) => {
  const sub = await prisma.subscription.upsert({
    where: { userId: req.user!.id },
    update: { 
      status: "ACTIVE", 
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
    },
    create: {
      userId: req.user!.id,
      stripeSubscriptionId: "mock_stripe_id_" + Date.now(),
      plan: "MONTHLY",
      status: "ACTIVE",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
  res.json(sub);
});

export default router;
