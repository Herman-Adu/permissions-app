import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { hasPermission } from "@/lib/auth/auth-abac";
import { User, type Todo } from "@/data/types";
import { CheckIcon, XIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

const todos = [
  {
    id: "1",
    title: "Record Video",
    userId: "1",
    completed: false,
    invitedUsers: [],
  },
  {
    id: "2",
    title: "Learn Auth",
    userId: "1",
    completed: true,
    invitedUsers: [],
  },
  {
    id: "3",
    title: "Build Project",
    userId: "2",
    completed: false,
    invitedUsers: [],
  },
  {
    id: "4",
    title: "Master Auth",
    userId: "2",
    completed: true,
    invitedUsers: ["1", "3"],
  },
];

// hard code user
//const user: User = { roles: ["user", "moderator"], id: "1", blockedBy: ["2"] };

export default async function ExampleFour() {
  // get user id
  const { sessionClaims, userId } = await auth();

  if (sessionClaims == null || userId == null) {
    return (
      <Button asChild>
        <SignInButton />
      </Button>
    );
  }

  const user = { id: userId, roles: sessionClaims.roles, blockedBy: [] };
  console.log("User: ", user);

  return (
    <div className="container mx-auto px-4 my-6">
      <h1 className="text-2xl font-semibold mb-4">
        {user.id}: {user.roles.join(", ")}
      </h1>

      {/* Button check across all todos */}
      <div className="flex gap-2 mb-4">
        <GeneralButtonCheck user={user} resource="todos" action="view" />
        <GeneralButtonCheck user={user} resource="todos" action="create" />
        <GeneralButtonCheck user={user} resource="todos" action="update" />
        <GeneralButtonCheck user={user} resource="todos" action="delete" />
      </div>

      {/* loop through all todos passing each one into the Todos function */}
      <ul className="grid gap-4 grid-cols-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo user={user} {...todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// get each todo and create a card to show the permission status
function Todo({ user, ...todo }: { user: User } & Todo) {
  const { title, userId, completed, invitedUsers } = todo;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {completed ? (
            <CheckIcon className="text-green-500" />
          ) : (
            <XIcon className="text-destructive" />
          )}
          {title}
        </CardTitle>
        <CardDescription>
          User {userId}{" "}
          {invitedUsers.length > 0 && `+ user ${invitedUsers.join(", User")}`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <TodoButtonCheck user={user} action="view" todo={todo} />
        <TodoButtonCheck user={user} action="update" todo={todo} />
        <TodoButtonCheck user={user} action="delete" todo={todo} />
      </CardFooter>
    </Card>
  );
}

function GeneralButtonCheck({
  user,
  resource,
  action,
}: {
  user: User;
  resource: "todos" | "comments";
  action: "view" | "create" | "update" | "delete";
}) {
  return (
    <Button
      variant={
        hasPermission(user, resource, action) ? "default" : "destructive"
      }
    >
      {action} any
    </Button>
  );
}

function TodoButtonCheck({
  user,
  todo,
  action,
}: {
  user: User;
  todo: Todo;
  action: "view" | "delete" | "update" | "create";
}) {
  return (
    <Button
      variant={
        hasPermission(user, "todos", action, todo) ? "default" : "destructive"
      }
    >
      {action} any
    </Button>
  );
}
