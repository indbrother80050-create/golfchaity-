import { Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

export abstract class BaseController {
  /**
   * Send a successful JSON response
   */
  protected sendSuccess(res: Response, data: any, statusCode: number = 200) {
    return res.status(statusCode).json(ApiResponse.success("Success", data));
  }

  /**
   * Send an error JSON response
   */
  protected sendError(
    res: Response,
    message: string | any[],
    statusCode: number = 400
  ) {
    if (Array.isArray(message)) {
      // Handle Zod errors
      const errorMsg = message.map((err) => err.message).join(", ");
      return res.status(statusCode).json(ApiResponse.error(errorMsg, message));
    }
    return res.status(statusCode).json(ApiResponse.error(message));
  }
}
