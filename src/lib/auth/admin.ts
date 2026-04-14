type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function isAdminUser(user: unknown): boolean {
  if (!isRecord(user)) {
    return false;
  }

  const role = user["role"];
  if (typeof role === "string" && role.toLowerCase() === "admin") {
    return true;
  }

  const roles = getStringArray(user["roles"]);
  if (roles.some((item) => item.toLowerCase() === "admin")) {
    return true;
  }

  const metadataValue = user["metadata"];
  const metadata = isRecord(metadataValue) ? metadataValue : undefined;
  const metadataRole = metadata?.["role"];
  if (typeof metadataRole === "string" && metadataRole.toLowerCase() === "admin") {
    return true;
  }

  const metadataRoles = getStringArray(metadata?.["roles"]);
  return metadataRoles.some((item) => item.toLowerCase() === "admin");
}
