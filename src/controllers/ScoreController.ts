import { Response, NextFunction } from "express";
import { BaseController } from "./BaseController.ts";
import scoreService from "../services/ScoreService.ts";
import { scoreSchema } from "../lib/validations.ts";
import { AuthRequest } from "../middlewares/auth.ts";

export class ScoreController extends BaseController {
  private static instance: ScoreController;

  private constructor() {
    super();
  }

  public static getInstance(): ScoreController {
    if (!ScoreController.instance) {
      ScoreController.instance = new ScoreController();
    }
    return ScoreController.instance;
  }

  public getScores = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return this.sendError(res, "Unauthorized", 401);
      const scores = await scoreService.getUserScores(req.user.id);
      return this.sendSuccess(res, scores);
    } catch (error) {
      next(error);
    }
  };

  public createScore = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return this.sendError(res, "Unauthorized", 401);
      const { value } = scoreSchema.parse(req.body);
      const score = await scoreService.createScore(req.user.id, value);
      return this.sendSuccess(res, score, 201);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return this.sendError(res, error.errors, 400);
      }
      next(error);
    }
  };
}

export default ScoreController.getInstance();
