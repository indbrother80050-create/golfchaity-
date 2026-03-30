import prisma from "../config/prisma.js";
import { logger } from "../utils/logger.js";

export const runDraw = async (mode: "RANDOM" | "WEIGHTED") => {
  logger.info(`Starting ${mode} draw...`);

  // 1. Get all active subscribers
  const subscribers = await prisma.user.findMany({
    where: {
      subscription: { status: "ACTIVE" },
    },
    include: { scores: true },
  });

  if (subscribers.length === 0) {
    logger.warn("No active subscribers for draw.");
    return;
  }

  // 2. Generate winning numbers (5 numbers between 1-45)
  const winningNumbers = Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * 45) + 1
  );

  const draw = await prisma.draw.create({
    data: {
      numbers: JSON.stringify(winningNumbers),
      mode,
    },
  });

  // 3. Match logic
  for (const user of subscribers) {
    const userScores = user.scores.map((s) => s.value);
    const matches = userScores.filter((s) => winningNumbers.includes(s)).length;

    if (matches >= 3) {
      let prize = 0;
      if (matches === 5)
        prize = 1000; // Simplified for demo
      else if (matches === 4) prize = 250;
      else if (matches === 3) prize = 50;

      const result = await prisma.drawResult.create({
        data: {
          drawId: draw.id,
          userId: user.id,
          matches,
          prize,
        },
      });

      await prisma.winner.create({
        data: {
          userId: user.id,
          drawResultId: result.id,
          status: "PENDING",
        },
      });

      // Calculate donation
      const donationAmount = prize * (user.charityContribution / 100);
      if (user.charityId) {
        await prisma.donation.create({
          data: {
            userId: user.id,
            charityId: user.charityId,
            amount: donationAmount,
          },
        });
      }
    }
  }

  logger.info(`Draw ${draw.id} completed.`);
};
