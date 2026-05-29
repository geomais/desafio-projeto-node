import { projectDocuments, projects } from "../../data/data";
import type { Project, ProjectDocument } from "../../types/domain.types";

export function findAllProjects(): readonly Project[] {
  return projects;
}

export function findProjectById(id: string): Project | undefined {
  return projects.find((project: Project): boolean => project.id === id);
}

export function findProjectsByCompanyId(companyId: string): readonly Project[] {
  return projects.filter((project: Project): boolean => project.companyId === companyId);
}

export function findDocumentsByProjectId(projectId: string): readonly ProjectDocument[] {
  return projectDocuments.filter(
    (document: ProjectDocument): boolean => document.projectId === projectId
  );
}
