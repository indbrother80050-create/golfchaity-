import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${err.name}: ${err.message}\n${err.stack}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res
    .status(statusCode)
    .json(
      ApiResponse.error(
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : message,
        process.env.NODE_ENV === "production" ? undefined : err.stack
      )
    );
};
