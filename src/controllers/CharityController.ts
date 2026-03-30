import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController.ts";
import charityService from "../services/CharityService.ts";
import { charitySchema } from "../lib/validations.ts";

export class CharityController extends BaseController {
  private static instance: CharityController;

  private constructor() {
    super();
  }

  public static getInstance(): CharityController {
    if (!CharityController.instance) {
      CharityController.instance = new CharityController();
    }
    return CharityController.instance;
  }

  public getCharities = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const charities = await charityService.getCharities(search);
      return this.sendSuccess(res, charities);
    } catch (error) {
      next(error);
    }
  };

  public createCharity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = charitySchema.parse(req.body);
      const charity = await charityService.createCharity(data);
      return this.sendSuccess(res, charity, 201);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return this.sendError(res, error.errors, 400);
      }
      next(error);
    }
  };
}

export default CharityController.getInstance();
