import { Router } from "express";
import prisma from "../lib/prisma.ts";
import { AuthRequest, authenticate, checkSubscription } from "../middlewares/auth.ts";
import { scoreSchema } from "../lib/validations.ts";

const router = Router();

router.get("/", authenticate, async (req: AuthRequest, res) => {
  const scores = await prisma.score.findMany({
    where: { userId: req.user!.id },
    orderBy: { date: "desc" },
    take: 5,
  });
  res.json(scores);
});

router.post("/", authenticate, checkSubscription, async (req: AuthRequest, res) => {
  try {
    const { value } = scoreSchema.parse(req.body);
    const userId = req.user!.id;

    // Get current scores
    const currentScores = await prisma.score.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    // If we have 5 or more, delete the oldest
    if (currentScores.length >= 5) {
      const oldest = currentScores[currentScores.length - 1];
      await prisma.score.delete({ where: { id: oldest.id } });
    }

    const score = await prisma.score.create({
      data: { userId, value },
    });

    res.status(201).json(score);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
