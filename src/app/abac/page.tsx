import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
    completed: true,
    invitedUsers: ["user_2vjHj20yihQ6QZKka7LkPaILTnr"],
  },
  {
    id: "4",
    title: "Master Auth",
    userId: "3",
    completed: false,
    invitedUsers: ["1", "2", "user_2vjHj20yihQ6QZKka7LkPaILTnr"],
  },
  {
    id: "5",
    title: "Next JS",
    userId: "4",
    completed: true,
    invitedUsers: ["3"],
  },
  {
    id: "6",
    title: "Clerk User 1",
    userId: "user_2vjHj20yihQ6QZKka7LkPaILTnr",
    completed: true,
    invitedUsers: ["2"],
  },
  {
    id: "7",
    title: "Clerk User 2",
    userId: "user_2vj1ihTzEqIpiF4VGlnBACFWe3J",
    completed: false,
    invitedUsers: ["4"],
  },
];

// hard code user
/* const user: User = {
  roles: ["user", "moderator"],
  id: "1",
  blockedBy: ["2"],
}; */

export default async function AttributeBaseAcceessControl() {
  // get user id
  const { sessionClaims, userId } = await auth();

  // if no user or role return redirect to sign in page
  if (userId == null || sessionClaims.roles == null) {
    return redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }

  const userDetails = await currentUser();
  //console.log("User: ", userDetails);

  // build user object
  const user: User = {
    id: userId,
    roles: sessionClaims.roles,
    blockedBy: [],
    username: userDetails?.username as string,
  };

  //console.log("User: ", user);

  return (
    <div className="flex flex-col-reverse lg:grid md:grid-cols-[6fr_2fr]">
      <div className="bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <h1 className="text-2xl mb-6">Attribute Base Access Control</h1>
        <div className="text-1xl mb-2">Welcome back {user.username}</div>
        <div className="text-1xl mb-2">Role: {sessionClaims?.roles}</div>
        <div className="text-1xl mb-6">UserId: {user.id}</div>

        {/* Button check across all todos */}
        <div className="container flex flex-wrap gap-2 mb-4">
          <GeneralButtonCheck user={user} resource="todos" action="view" />
          <GeneralButtonCheck user={user} resource="todos" action="create" />
          <GeneralButtonCheck user={user} resource="todos" action="update" />
          <GeneralButtonCheck user={user} resource="todos" action="delete" />
        </div>

        {/* loop through all todos passing each one into the Todos function */}
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo user={user} {...todo} />
            </li>
          ))}
        </ul>
      </div>

      <aside className="bg-white/50 rounded-xl py-7 px-8 m-6  h-fit w-fit hidden md:block">
        <h1 className="text-2xl mb-6">Table of contents</h1>
        <p className="mt-6 mb-6 text-transparent">
          As you can see the system very quickly spirals out of control it works
          great for relatively simple systems but as soon as you get more
          complex it becomes very limited. Leading us into the final permission
          system we are going to build and discuss, Attribute Based Role Access
        </p>
      </aside>
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
      <CardFooter className="container flex flex-wrap gap-2 ">
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
