export const ROLES = {
  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  USER: "User",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
