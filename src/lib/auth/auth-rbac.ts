import { User } from "@/data/types";

export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  admin: [
    "view:comments",
    "create:comments",
    "update:comments",
    "delete:comments",
  ],
  moderator: [
    "view:comments",
    "create:comments",
    "update:ownComments",
    "delete:ownComments",
    "delete:comments",
  ],
  user: [
    "view:comments",
    "create:comments",
    "update:ownComments",
    "delete:ownComments",
  ],
} as const;

export function hasPermission(
  user: { id: string; roles: Role[] },
  permission: Permission
) {
  return user.roles.some((role) => {
    return (ROLES[role] as readonly Permission[]).includes(permission);
  });
}

// USAGE:

// hard code user
const user: User = {
  id: "1",
  roles: ["user"],
  blockedBy: [],
  username: "User One",
};

// Can create a comment
hasPermission(user, "create:comments");

// Can view all comments
hasPermission(user, "view:comments");

// Can update all comments
hasPermission(user, "update:comments");

// Can delete all comments
hasPermission(user, "delete:comments");

// Can update his own comments
hasPermission(user, "update:ownComments");

// Can delete his own comments
hasPermission(user, "delete:ownComments");
