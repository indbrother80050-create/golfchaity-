import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController.ts";
import authService from "../services/AuthService.ts";
import { registerSchema, loginSchema } from "../lib/validations.ts";
import { AuthRequest } from "../middlewares/auth.ts";

export class AuthController extends BaseController {
  private static instance: AuthController;

  private constructor() {
    super();
  }

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerSchema.parse(req.body);
      await authService.registerUser(data);
      return this.sendSuccess(res, { message: "User registered successfully" }, 201);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return this.sendError(res, error.errors, 400);
      }
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);
      const { user, accessToken, refreshToken } = await authService.loginUser(data);

      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "none" });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });

      return this.sendSuccess(res, { user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return this.sendError(res, error.errors, 400);
      }
      if (error.message === "Invalid credentials") {
        return this.sendError(res, "Invalid credentials", 401);
      }
      next(error);
    }
  };

  public logout = (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return this.sendSuccess(res, { message: "Logged out" });
  };

  public getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return this.sendError(res, "Unauthorized", 401);
      const user = await authService.getUserProfile(req.user.id);
      if (!user) return this.sendError(res, "User not found", 404);
      return this.sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  };

  public mockSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return this.sendError(res, "Unauthorized", 401);
      const sub = await authService.mockSubscription(req.user.id);
      return this.sendSuccess(res, sub);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController.getInstance();
