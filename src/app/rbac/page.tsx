import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { hasPermission, Role } from "@/lib/auth/auth-rbac";

//const user = { id: userId, roles: sessionClaims.roles };

const user: { id: string; roles: Role[] } = { roles: ["user"], id: "1" };
const authorId = "1";

export default function RoleBaseAcceessControl() {
  return (
    <div className="container, mx-auto px-4 my-6">
      <h1 className="text-3xl mb-6">Role base access control</h1>
      <Card>
        <CardHeader>Comment</CardHeader>
        <CardContent>Some random content</CardContent>
        {hasPermission(user, "delete:comments") ||
          (hasPermission(user, "delete:ownComments") &&
            user.id === authorId && (
              <CardFooter>
                <Button variant="destructive">Delete</Button>
              </CardFooter>
            ))}
      </Card>
    </div>
  );
}
