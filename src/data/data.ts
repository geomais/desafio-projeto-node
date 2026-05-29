import type { Company, Project, ProjectDocument, User } from "../types/domain.types";

export const companies: readonly Company[] = [
  {
    id: "company-north",
    name: "Construtora Norte"
  },
  {
    id: "company-south",
    name: "Urbaniza Sul"
  }
];

export const users: readonly User[] = [
  {
    id: "user-north",
    name: "Marina Costa",
    email: "marina.costa@construtoranorte.example",
    companyId: "company-north",
    role: "USER"
  },
  {
    id: "user-south",
    name: "Rafael Lima",
    email: "rafael.lima@urbanizasul.example",
    companyId: "company-south",
    role: "USER"
  },
  {
    id: "user-admin",
    name: "Admin GeoProjetoDigital",
    email: "admin@geoprojetodigital.example",
    companyId: null,
    role: "ADMIN_GLOBAL"
  }
];

export const projects: readonly Project[] = [
  {
    id: "project-palmeiras",
    name: "Residencial Jardim das Palmeiras",
    status: "IN_REVIEW",
    companyId: "company-north",
    address: "Rua das Palmeiras, 1200",
    city: "Curitiba",
    protocolNumber: "GPD-2026-0001",
    createdAt: "2026-01-12T10:30:00.000Z"
  },
  {
    id: "project-bela-vista",
    name: "Loteamento Bela Vista",
    status: "APPROVED",
    companyId: "company-north",
    address: "Estrada Bela Vista, km 8",
    city: "Londrina",
    protocolNumber: "GPD-2026-0002",
    createdAt: "2026-01-18T14:20:00.000Z"
  },
  {
    id: "project-horizonte-sul",
    name: "Edifício Horizonte Sul",
    status: "IN_REVIEW",
    companyId: "company-south",
    address: "Avenida Atlântica, 450",
    city: "Florianópolis",
    protocolNumber: "GPD-2026-0003",
    createdAt: "2026-02-03T09:15:00.000Z"
  },
  {
    id: "project-parque-linear",
    name: "Condomínio Parque Linear",
    status: "REJECTED",
    companyId: "company-south",
    address: "Rua Parque Linear, 77",
    city: "Porto Alegre",
    protocolNumber: "GPD-2026-0004",
    createdAt: "2026-02-21T16:45:00.000Z"
  }
];

export const projectDocuments: readonly ProjectDocument[] = [
  {
    id: "document-palmeiras-planta",
    projectId: "project-palmeiras",
    name: "Planta arquitetônica",
    required: true,
    uploaded: true,
    uploadedAt: "2026-01-12T11:00:00.000Z"
  },
  {
    id: "document-palmeiras-memorial",
    projectId: "project-palmeiras",
    name: "Memorial descritivo",
    required: true,
    uploaded: false,
    uploadedAt: null
  },
  {
    id: "document-palmeiras-art-rrt",
    projectId: "project-palmeiras",
    name: "ART/RRT",
    required: true,
    uploaded: true,
    uploadedAt: "2026-01-12T11:20:00.000Z"
  },
  {
    id: "document-bela-vista-planta",
    projectId: "project-bela-vista",
    name: "Planta urbanística",
    required: true,
    uploaded: true,
    uploadedAt: "2026-01-18T14:50:00.000Z"
  },
  {
    id: "document-bela-vista-memorial",
    projectId: "project-bela-vista",
    name: "Memorial descritivo",
    required: true,
    uploaded: true,
    uploadedAt: "2026-01-18T15:05:00.000Z"
  },
  {
    id: "document-horizonte-planta",
    projectId: "project-horizonte-sul",
    name: "Planta arquitetônica",
    required: true,
    uploaded: true,
    uploadedAt: "2026-02-03T09:40:00.000Z"
  },
  {
    id: "document-horizonte-memorial",
    projectId: "project-horizonte-sul",
    name: "Memorial descritivo",
    required: true,
    uploaded: true,
    uploadedAt: "2026-02-03T09:55:00.000Z"
  },
  {
    id: "document-horizonte-art-rrt",
    projectId: "project-horizonte-sul",
    name: "ART/RRT",
    required: true,
    uploaded: true,
    uploadedAt: "2026-02-03T10:10:00.000Z"
  },
  {
    id: "document-parque-planta",
    projectId: "project-parque-linear",
    name: "Planta arquitetônica",
    required: true,
    uploaded: true,
    uploadedAt: "2026-02-21T17:00:00.000Z"
  },
  {
    id: "document-parque-memorial",
    projectId: "project-parque-linear",
    name: "Memorial descritivo",
    required: true,
    uploaded: false,
    uploadedAt: null
  }
];
