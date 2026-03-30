import prisma from "../lib/prisma.ts";

export class ScoreService {
  private static instance: ScoreService;

  private constructor() {}

  public static getInstance(): ScoreService {
    if (!ScoreService.instance) {
      ScoreService.instance = new ScoreService();
    }
    return ScoreService.instance;
  }

  public async getUserScores(userId: string) {
    return prisma.score.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 5,
    });
  }

  public async createScore(userId: string, value: number) {
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

    return prisma.score.create({
      data: {
        userId,
        value,
      },
    });
  }
}

export default ScoreService.getInstance();
