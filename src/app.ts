import express, { type Request, type Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { projectRouter } from "./modules/projects/project.routes";
import { getProjectVersion } from "./shared/project-version";
import type { HealthResponse } from "./types/http.types";

export const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response<HealthResponse>): void => {
  res.json({
    status: "ok",
    service: "GeoProjetoDigital API",
    version: getProjectVersion()
  });
});

app.use("/projects", authMiddleware, projectRouter);

app.use(errorHandler);
