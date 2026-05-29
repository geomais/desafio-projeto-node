export interface Company {
  readonly id: string;
  readonly name: string;
}

export type UserRole = "USER" | "ADMIN_GLOBAL";

export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly companyId: string | null;
  readonly role: UserRole;
}

export type ProjectStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "REJECTED";

export type DisplayStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "PENDING_DOCUMENTS"
  | "APPROVED"
  | "REJECTED";

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly status: ProjectStatus;
  readonly companyId: string;
  readonly address: string;
  readonly city: string;
  readonly protocolNumber: string;
  readonly createdAt: string;
}

export interface ProjectDocument {
  readonly id: string;
  readonly projectId: string;
  readonly name: string;
  readonly required: boolean;
  readonly uploaded: boolean;
  readonly uploadedAt: string | null;
}

export interface AuthenticatedUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly companyId: string | null;
  readonly role: UserRole;
}
