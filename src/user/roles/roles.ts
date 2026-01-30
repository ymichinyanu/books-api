export const Roles = {
  User: 'User',
  Admin: 'Admin',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
