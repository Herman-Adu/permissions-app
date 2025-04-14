import { SignInButton, SignedOut } from "@clerk/nextjs";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { hasPermission } from "@/lib/auth/auth-rbac";
import { auth } from "@clerk/nextjs/server";

const authorId = "1";

export default async function ExampleThree() {
  // get user id
  const { sessionClaims, userId } = await auth();

  // if no user or role return sign in button
  if (userId == null || sessionClaims.roles == null) {
    return (
      <Button asChild>
        <SignInButton />
      </Button>
    );
  }
  const user = { id: userId, roles: sessionClaims.roles };

  return (
    <div className="container, mx-auto px-4 my-6">
      <h1 className="text-4xl mb-6">Role base access control</h1>
      <h2 className="text-2xl mb-6">Sync Permissions System with Clerk</h2>
      <h3 className="text-2xl mb-6">Implemented multiple roles for a user</h3>
      <div>Role: {sessionClaims?.roles}</div>
      <SignedOut></SignedOut>
      <Card>
        <CardHeader>Comment</CardHeader>
        <CardContent>Some random content</CardContent>
        {(hasPermission(user, "delete:comments") ||
          (hasPermission(user, "delete:ownComments") &&
            user.id === authorId)) && (
          <CardFooter>
            <Button variant="destructive">Delete</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
