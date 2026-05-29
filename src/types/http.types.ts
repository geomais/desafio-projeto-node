import type { DisplayStatus, ProjectStatus } from "./domain.types";

export interface HealthResponse {
  readonly status: "ok";
  readonly service: "GeoProjetoDigital API";
  readonly version: string;
}

export interface ProjectListItemResponse {
  readonly id: string;
  readonly name: string;
  readonly companyId: string;
  readonly status: ProjectStatus;
  readonly displayStatus: DisplayStatus;
  readonly city: string;
  readonly protocolNumber: string;
  readonly createdAt: string;
}

export interface ProjectDocumentResponse {
  readonly id: string;
  readonly name: string;
  readonly required: boolean;
  readonly uploaded: boolean;
  readonly uploadedAt: string | null;
}

export interface ProjectDetailResponse {
  readonly id: string;
  readonly name: string;
  readonly companyId: string;
  readonly status: ProjectStatus;
  readonly address: string;
  readonly city: string;
  readonly protocolNumber: string;
  readonly createdAt: string;
  readonly documents: readonly ProjectDocumentResponse[];
}

export interface ApiErrorResponse {
  readonly message: string;
  readonly statusCode: number;
}
