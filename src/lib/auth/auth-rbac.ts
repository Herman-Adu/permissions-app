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

/* // USAGE:

const user: User = { id: "1", roles: ["user"] };

// Can create a comment

hasPermission(user, "create:comments");

// Can view all comments

hasPermission(user, "view:comments");
 */
