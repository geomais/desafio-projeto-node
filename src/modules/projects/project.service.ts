import type {
  AuthenticatedUser,
  DisplayStatus,
  Project
} from "../../types/domain.types";
import type {
  ProjectDetailResponse,
  ProjectDocumentResponse,
  ProjectListItemResponse
} from "../../types/http.types";
import { NotFoundError } from "../../shared/errors/not-found-error";
import {
  findAllProjects,
  findDocumentsByProjectId,
  findProjectById,
  findProjectsByCompanyId
} from "./project.repository";
import {
  toProjectDetailResponse,
  toProjectDocumentResponse,
  toProjectListItemResponse
} from "./project.mapper";

export function listProjects(user: AuthenticatedUser): ProjectListItemResponse[] {
  const projects = getVisibleProjects(user);

  return projects.map((project: Project): ProjectListItemResponse => {
    const displayStatus = calculateDisplayStatus(project);

    return toProjectListItemResponse(project, displayStatus);
  });
}

export function getProjectById(
  projectId: string,
  user: AuthenticatedUser
): ProjectDetailResponse {
  const project = findProjectById(projectId);

  if (!project) {
    throw new NotFoundError("Projeto não encontrado.");
  }

  if (user.role === "ADMIN_GLOBAL") {
    const adminDocuments = findDocumentsByProjectId(project.id);

    return toProjectDetailResponse(project, adminDocuments);
  }

  const documents = findDocumentsByProjectId(project.id);

  return toProjectDetailResponse(project, documents);
}

export function listProjectDocuments(
  projectId: string,
  user: AuthenticatedUser
): ProjectDocumentResponse[] {
  const project = findProjectById(projectId);

  if (!project || !canAccessProject(user, project)) {
    throw new NotFoundError("Projeto não encontrado.");
  }

  return findDocumentsByProjectId(project.id).map(toProjectDocumentResponse);
}

export function calculateDisplayStatus(project: Project): DisplayStatus {
  if (project.status !== "IN_REVIEW") {
    return project.status;
  }

  const hasRequiredPendingDocument = findDocumentsByProjectId(project.id).some(
    (document): boolean => document.required && !document.uploaded
  );

  if (hasRequiredPendingDocument) {
    return "PENDING_DOCUMENTS";
  }

  return project.status;
}

function getVisibleProjects(user: AuthenticatedUser): readonly Project[] {
  if (user.role === "ADMIN_GLOBAL") {
    return findAllProjects();
  }

  if (user.companyId === null) {
    return [];
  }

  return findProjectsByCompanyId(user.companyId);
}

function canAccessProject(user: AuthenticatedUser, project: Project): boolean {
  if (user.role === "ADMIN_GLOBAL") {
    return true;
  }

  return user.companyId === project.companyId;
}
