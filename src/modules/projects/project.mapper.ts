import type { DisplayStatus, Project, ProjectDocument } from "../../types/domain.types";
import type {
  ProjectDetailResponse,
  ProjectDocumentResponse,
  ProjectListItemResponse
} from "../../types/http.types";

export function toProjectListItemResponse(
  project: Project,
  displayStatus: DisplayStatus
): ProjectListItemResponse {
  return {
    id: project.id,
    name: project.name,
    companyId: project.companyId,
    status: project.status,
    displayStatus,
    city: project.city,
    protocolNumber: project.protocolNumber,
    createdAt: project.createdAt
  };
}

export function toProjectDetailResponse(
  project: Project,
  documents: readonly ProjectDocument[]
): ProjectDetailResponse {
  return {
    id: project.id,
    name: project.name,
    companyId: project.companyId,
    status: project.status,
    address: project.address,
    city: project.city,
    protocolNumber: project.protocolNumber,
    createdAt: project.createdAt,
    documents: documents.map(toProjectDocumentResponse)
  };
}

export function toProjectDocumentResponse(document: ProjectDocument): ProjectDocumentResponse {
  return {
    id: document.id,
    name: document.name,
    required: document.required,
    uploaded: document.uploaded,
    uploadedAt: document.uploadedAt
  };
}
