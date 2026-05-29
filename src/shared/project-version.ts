import { readFileSync } from "node:fs";
import { join } from "node:path";

interface PackageMetadata {
  readonly version: string;
}

export function getProjectVersion(): string {
  const packageJsonPath = join(process.cwd(), "package.json");
  const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
  const packageMetadata: unknown = JSON.parse(packageJsonContent);

  if (!isPackageMetadata(packageMetadata)) {
    throw new Error("package.json sem versão válida.");
  }

  return packageMetadata.version;
}

function isPackageMetadata(value: unknown): value is PackageMetadata {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "version" in value && typeof value.version === "string";
}
