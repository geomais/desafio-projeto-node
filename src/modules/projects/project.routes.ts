import { Router, type Request, type Response } from "express";
import { UnauthorizedError } from "../../shared/errors/unauthorized-error";
import type { AuthenticatedUser } from "../../types/domain.types";
import type { ProjectDetailResponse, ProjectDocumentResponse, ProjectListItemResponse } from "../../types/http.types";
import { getProjectById, listProjectDocuments, listProjects } from "./project.service";

interface ProjectIdParams {
  readonly id: string;
}

interface RequestWithUser {
  readonly user?: AuthenticatedUser;
}

export const projectRouter = Router();

projectRouter.get(
  "/",
  (req: Request, res: Response<readonly ProjectListItemResponse[]>): void => {
    const user = getAuthenticatedUser(req);
    const projects = listProjects(user);

    res.json(projects);
  }
);

projectRouter.get(
  "/:id",
  (req: Request<ProjectIdParams>, res: Response<ProjectDetailResponse>): void => {
    const user = getAuthenticatedUser(req);
    const project = getProjectById(req.params.id, user);

    res.json(project);
  }
);

projectRouter.get(
  "/:id/documents",
  (req: Request<ProjectIdParams>, res: Response<readonly ProjectDocumentResponse[]>): void => {
    const user = getAuthenticatedUser(req);
    const documents = listProjectDocuments(req.params.id, user);

    res.json(documents);
  }
);

function getAuthenticatedUser(req: RequestWithUser): AuthenticatedUser {
  if (!req.user) {
    throw new UnauthorizedError("Usuário não autenticado.");
  }

  return req.user;
}
