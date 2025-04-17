import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { hasPermission } from "@/lib/auth/auth-rbac";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";

const authorId = "1";

export default async function ClerkIntegration() {
  // get user id
  const { sessionClaims, userId } = await auth();

  // if no user or role return redirect to sign in page
  if (userId == null || sessionClaims.roles == null) {
    return redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }

  const userDetails = await currentUser();
  //console.log("User: ", userDetails);

  const user = {
    id: userId,
    roles: sessionClaims.roles,
    username: userDetails?.username,
  };

  return (
    <div className="container, mx-auto px-4 my-6">
      {/* <h2 className="text-2xl mb-6">Sync Permissions System with Clerk</h2>
      <h3 className="text-2xl mb-6">Implemented multiple roles for a user</h3> */}
      <h1 className="text-2xl mb-6">Clerk Integration</h1>
      <div className="text-1xl mb-2">Welcome back {user?.username}</div>
      <div className="text-1xl mb-2">Role: {sessionClaims?.roles}</div>
      <div className="text-1xl mb-6">UserId: {user.id}</div>
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
