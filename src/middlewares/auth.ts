import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma.ts";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

export const checkSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.user.role === "ADMIN") return next();

  const sub = await prisma.subscription.findUnique({
    where: { userId: req.user.id },
  });

  if (!sub || sub.status !== "ACTIVE") {
    return res.status(403).json({ error: "Active subscription required" });
  }

  next();
};
