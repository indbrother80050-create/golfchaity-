import { Response } from "express";

export abstract class BaseController {
  /**
   * Send a successful JSON response
   */
  protected sendSuccess(res: Response, data: any, statusCode: number = 200) {
    return res.status(statusCode).json(data);
  }

  /**
   * Send an error JSON response
   */
  protected sendError(res: Response, message: string, statusCode: number = 400) {
    return res.status(statusCode).json({ error: message });
  }
}
