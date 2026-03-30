import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ApiResponse } from "./utils/ApiResponse.js";

import authRouter from "./routes/auth.js";
import scoreRouter from "./routes/scores.js";
import charityRouter from "./routes/charities.js";
import webhookRouter from "./routes/webhooks.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Security Middlewares
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disable for Vite dev
    })
  );
  app.use(
    cors({
      origin: process.env.APP_URL || "http://localhost:3000",
      credentials: true,
    })
  );

  // IMPORTANT: Webhooks must be mounted BEFORE express.json()
  app.use("/api/v1/webhooks", webhookRouter);

  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  const apiRouter = express.Router();

  apiRouter.get("/health", (req, res) => {
    res.json(
      ApiResponse.success("Server is healthy", {
        timestamp: new Date().toISOString(),
      })
    );
  });

  apiRouter.use("/auth", authRouter);
  apiRouter.use("/scores", scoreRouter);
  apiRouter.use("/charities", charityRouter);

  // Mount API router
  app.use("/api/v1", apiRouter);

  // Global Error Handler
  app.use(errorHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  logger.error("Failed to start server:", err);
});
